"""想要作品的只读资源查询：串行请求、有限缓存、来源限速与失败冷却。"""
from __future__ import annotations

from collections import OrderedDict
from functools import lru_cache
from pathlib import Path
from threading import Lock
from threading import RLock
import json
import math
import time
from datetime import datetime, timezone

from .coded_text import Said, coded
from .sources import FailureReason, SourceFailure
from .catalog_rules import normalise_code_key
from .catalog_vocabulary import resource_item
from .fsutil import atomic_write_text
from .user_messages import UserValueError
from .jav_cache import cache_fresh, cache_lifetime as cache_lifetime

MAX_CACHE_BYTES = 16 * 1024 * 1024
CACHE_VERSION = 2


def reusable_result(result) -> bool:
    return (isinstance(result, dict) and result.get('state') == 'ready'
            and isinstance(result.get('items'), list)
            and all(isinstance(item, dict) and item.get('protocol') in {'magnet', 'ed2k', 'url'}
                    and isinstance(item.get('uri'), str) and isinstance(item.get('size'), str)
                    and isinstance(item.get('attributes'), list) for item in result['items'])
            and bool(result['items'] or result.get('complete') is True or not result.get('warnings')))


def fetch(root: Path, code: str, *, quick: bool = False, edition_preferences: tuple[str, ...] = (),
          retry_source: str = "") -> dict:
    """查一部的磁链与资源链接。无版次偏好时，定时查找可以跳过已有高清候选的 JavDB 查询。"""
    from .magnet_chain import edition_rank, search
    from .sources.javdb import merge_resources
    result = search(root, code, stop_on_preferred=False, skip_javdb_after_preferred=quick,
                    edition_preferences=edition_preferences, retry_source=retry_source)
    linked = result.pop('linked_resources', [])
    ranked = [{**row, 'id': 'magnet:' + row['info_hash'], 'size': row['size_text']} for row in result['items']]
    items = merge_resources([*ranked, *linked])
    if edition_preferences:
        items.sort(key=lambda item: edition_rank(item, code, edition_preferences)
                   if item['protocol'] == 'magnet' else len(edition_preferences))
    return {**result, 'items': items[:128]}


def _retry_warnings(previous: dict, refreshed: dict, source: str) -> dict:
    retained = [index for index, owner in enumerate(previous.get('warning_sources') or []) if owner != source]
    rows = {}
    for key in ('warnings', 'warning_codes', 'warning_params', 'warning_sources'):
        before = previous.get(key) or []
        after = refreshed.get(key) or []
        rows[key] = [*(before[index] if index < len(before) else None for index in retained), *after]
    return rows


def _merge_retry(previous: dict, refreshed: dict, source: str) -> dict:
    from .magnet_chain import CHAIN
    from .sources.javdb import merge_resources

    rows = _retry_warnings(previous, refreshed, source)
    for key in ('retry_sources', 'connection_checks'):
        rows[key] = list(dict.fromkeys([*(value for value in previous.get(key, []) if value != source),
                                      *refreshed.get(key, [])]))
    label = next(entry.label for entry in CHAIN if entry.key == source)
    rows['unfetched_sources'] = list(dict.fromkeys([
        *(value for value in previous.get('unfetched_sources', []) if value != label),
        *refreshed.get('unfetched_sources', []),
    ]))
    pages = {page['url']: page for result in (previous, refreshed) for page in result.get('source_pages', [])}
    items = merge_resources([*previous['items'], *refreshed['items']])[:128]
    complete = refreshed.get('complete') is True and not (rows['unfetched_sources'] or rows['connection_checks'])
    state = 'ready' if (items or complete or previous['state'] == 'ready') else 'error'
    message = '' if state == 'ready' else Said('labels.magnetChain.incomplete')
    baseline = {key: value for key, value in previous.items() if key not in ('error_code', 'error_params')}
    failures = {key: warning for key, warning in zip(rows['warning_sources'], rows['warnings'])
                if key in rows['retry_sources']}
    delays = [value for value in (previous.get('retry_after'), refreshed.get('retry_after')) if value is not None]
    return {**baseline, **rows, **coded('error', message), 'state': state, 'items': items,
            'complete': complete, 'cache_stale': not complete and bool(previous.get('cache_stale')),
            'source_pages': list(pages.values()), 'source_failures': list(failures.values()),
            'source_url': refreshed.get('source_url') or previous.get('source_url', ''),
            'retry_after': max(delays, default=None) if rows['retry_sources'] else None,
            'checked_at': refreshed['checked_at'] if complete else previous.get('checked_at')}


class MagnetSearch:
    """一台服务同时只查一部；缓存最多 128 部，失败一分钟后可重试。"""

    def __init__(self, root: Path, *, fetcher=fetch, clock=time.monotonic, sleeper=time.sleep, wallclock=time.time):
        self.root, self.fetcher, self.clock, self.sleeper = root, fetcher, clock, sleeper
        self.wallclock = wallclock
        self.path = Path(root) / 'cache' / 'want-resources.json'
        self.lock = Lock()
        self.cache_lock = RLock()
        self.cache: OrderedDict[str, tuple[float, dict]] = OrderedDict()
        self.failures: dict[str, tuple[float, dict]] = {}
        self.saved_wall: dict[str, float] = {}
        self.next_request = 0.0
        self._load()

    def _load(self):
        try:
            if self.path.stat().st_size > MAX_CACHE_BYTES:
                return
            payload = json.loads(self.path.read_text(encoding='utf-8'))
            rows = payload.get('entries', []) if payload.get('version') in {1, CACHE_VERSION} else []
            if not isinstance(rows, list):
                return
            for row in reversed(rows[:128]):
                if not isinstance(row, dict) or not isinstance(row.get('code'), str):
                    continue
                saved = row.get('saved')
                if (type(saved) not in (int, float) or not math.isfinite(saved)
                        or saved > self.wallclock() or not reusable_result(row.get('result'))):
                    continue
                # 旧版写进缓存的中文来源与属性（「JavDB 评论」「中字」「高清」）读入时换成 id。
                result = {**row['result'], 'items': [resource_item(item) for item in row['result']['items']]}
                if payload.get('version') == 1 and result.get('warnings'):
                    result['cache_stale'] = True
                self.cache[normalise_code_key(row['code'])] = (
                    self.clock() - (self.wallclock() - saved), result)
                self.saved_wall[normalise_code_key(row['code'])] = saved
        except (OSError, ValueError, TypeError, AttributeError):
            return

    def _save(self):
        rows = [{'code': code, 'saved': self.saved_wall[code], 'result': result}
                for code, (_, result) in reversed(self.cache.items()) if reusable_result(result)]
        encoded = json.dumps({'version': CACHE_VERSION, 'entries': rows}, ensure_ascii=False)
        while len(encoded.encode('utf-8')) > MAX_CACHE_BYTES and rows:
            rows.pop()
            encoded = json.dumps({'version': CACHE_VERSION, 'entries': rows}, ensure_ascii=False)
        try:
            self.path.parent.mkdir(parents=True, exist_ok=True)
            atomic_write_text(self.path, encoded, mode=0o600)
        except OSError:
            return

    def _cached(self, code, released, edition_preferences=None):
        with self.cache_lock:
            cached = self.cache.get(code)
            saved = self.saved_wall.get(code, 0)
            elapsed = max(0, self.clock() - cached[0]) if cached else 0
            complete = (cached and reusable_result(cached[1]) and not cached[1].get('cache_stale')
                        and (cached[1].get('complete') is True or not cached[1].get('warnings')))
            same_order = (edition_preferences is None or
                          (cached and cached[1].get('edition_preferences', []) == list(edition_preferences)))
            if cached and same_order and (cache_fresh(saved, released, max(self.wallclock(), saved + elapsed)) if complete
                           else elapsed < (86400 if reusable_result(cached[1]) and not cached[1].get('cache_stale') else 60)):
                self.cache.move_to_end(code)
                return cached[1]
            failed = self.failures.get(code)
            if (failed and failed[0] + 60 > self.clock()
                    and (edition_preferences is None or
                         failed[1].get('edition_preferences', []) == list(edition_preferences))):
                return failed[1]
        return None

    def known_magnets(self, code, released=None):
        result = self._cached(normalise_code_key(code), released)
        return any(item.get('protocol') == 'magnet' for item in result['items']) if result else None

    def known_candidate(self, code, edition_preferences: tuple[str, ...] = ()):
        """已取得的正片磁链证据，不请求来源，也不把最近一次来源失败当作资源消失。"""
        from .jav_browser import _download_candidate
        from .magnet_chain import edition_rank
        with self.cache_lock:
            cached = self.cache.get(normalise_code_key(code))
            items = [item for item in cached[1]['items'] if item.get('protocol') == 'magnet'] if cached else []
            if edition_preferences:
                items.sort(key=lambda item: edition_rank(item, code, edition_preferences))
            return _download_candidate(items, code)

    def _remember(self, code, result):
        with self.cache_lock:
            previous = self.cache.get(code)
            failed = result['state'] == 'error' or bool(result.get('warnings') and result.get('complete') is not True)
            if failed and previous and reusable_result(previous[1]):
                from .sources.javdb import merge_resources
                result['items'] = merge_resources([*previous[1]['items'], *result['items']]) if result['items'] else previous[1]['items']
                result['checked_at'] = previous[1].get('checked_at')
                result['cache_stale'] = True
                self.failures[code] = (self.clock(), result)
                return
            self.failures.pop(code, None)
            self.cache[code] = (self.clock(), result)
            self.saved_wall[code] = self.wallclock()
            self.cache.move_to_end(code)
            while len(self.cache) > 128:
                removed, _ = self.cache.popitem(last=False)
                self.failures.pop(removed, None)
                self.saved_wall.pop(removed, None)
            if reusable_result(result):
                self._save()

    def query(self, code: str, *, refresh: bool = False, released: str | None = None, quick: bool = False,
              edition_preferences: tuple[str, ...] | None = None, retry_source: str = "") -> dict:
        code = normalise_code_key(code)
        cached = self._cached(code, released, edition_preferences)
        if cached and not (refresh or retry_source):
            return cached
        # 等锁的请求不积压为无限队列；前端把忙态留在卡片上，稍后再取。
        if not self.lock.acquire(timeout=0.05):
            return {"ok": True, "state": "busy", "items": cached['items'] if cached else [], "error": "",
                    "checked_at": cached.get('checked_at') if cached else None}
        try:
            cached = self._cached(code, released, edition_preferences)
            if not (refresh or retry_source) and cached:
                return cached
            if retry_source:
                with self.cache_lock:
                    failed = self.failures.get(code)
                    existing = self.cache.get(code)
                    cached = (failed or existing or (0, None))[1]
                if not cached or retry_source not in cached.get('retry_sources', []):
                    raise UserValueError("errors.resourceSearch.invalidRetrySource")
            delay = self.next_request - self.clock()
            if delay > 0:
                self.sleeper(delay)
            result = {"ok": True, "state": "ready", "items": [], "warnings": [], "error": "",
                      "checked_at": datetime.fromtimestamp(self.wallclock(), timezone.utc).isoformat()}
            try:
                options = {"quick": True} if quick else {}
                if retry_source:
                    options["retry_source"] = retry_source
                if edition_preferences:
                    options["edition_preferences"] = edition_preferences
                    result["edition_preferences"] = list(edition_preferences)
                result.update(self.fetcher(self.root, code, **options))
                if result['state'] == 'ready' and not reusable_result(result):
                    result.update(state='error', **coded('error', Said('labels.wantsMagnets.linksUnfetched')))
            except SourceFailure as error:
                if error.reason != FailureReason.NOT_FOUND:
                    result.update(state="error", **coded("error", Said(error.code, error.params)))
            except Exception:  # 来源异常只报告查询失败，不泄露请求或凭据
                result.update(state="error", **coded("error", Said("labels.wantsMagnets.chainUnfetched")))
            self.next_request = self.clock() + 3
            if retry_source:
                if "complete" not in result:
                    return cached
                result = _merge_retry(cached, result, retry_source)
            self._remember(code, result)
            return result
        finally:
            self.lock.release()


_FACTORY_LOCK = Lock()


@lru_cache(maxsize=4)
def _search_for(root: Path) -> MagnetSearch:
    return MagnetSearch(root)


def search_for(root: Path) -> MagnetSearch:
    # lru_cache 允许首次并发调用重复构造；工厂锁让所有卡片共用同一把查询锁。
    with _FACTORY_LOCK:
        return _search_for(Path(root).resolve())
