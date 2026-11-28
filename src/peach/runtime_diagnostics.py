"""服务端短期资源与媒体送流样本，按需随本机诊断导出。"""
from __future__ import annotations

import asyncio
from collections import deque
from datetime import datetime, timezone
from threading import Lock
from time import monotonic

import psutil


SAMPLE_SECONDS = 10
RESOURCE_SAMPLES = 60
PLAYBACK_SAMPLES = 60
SLOW_FIRST_BODY_MS = 300
CHILD_ROLES = frozenset({'ffmpeg', 'ffprobe', 'cloudflared', 'untrunc', 'amane-bridge'})
MEDIA_ROUTES = {
    '/stream': 'range', '/follow-stream': 'online', '/strm-resource/{id}/{key}': 'pointer',
    '/external-stream/{id}': 'external-player', '/stream/hls/{id}/{index}.ts': 'hls-segment',
    '/stream/hls/{id}/index.m3u8': 'hls-playlist',
}


def _timestamp():
    return datetime.now(timezone.utc).isoformat(timespec='milliseconds')


class RuntimeDiagnostics:
    def __init__(self):
        self._process = psutil.Process()
        self._resources = deque(maxlen=RESOURCE_SAMPLES)
        self._playback = deque(maxlen=PLAYBACK_SAMPLES)
        self._lock = Lock()
        self._previous = {}
        self._sample_time = None

    def collect(self):
        sampled = monotonic()
        elapsed = sampled - self._sample_time if self._sample_time is not None else None
        current = {}
        groups = {}
        for process in [self._process, *self._process.children(recursive=True)]:
            try:
                with process.oneshot():
                    name = process.name().lower().removesuffix('.exe')
                    role = ('server' if process == self._process else
                            name if name in CHILD_ROLES else 'other-child')
                    identity = (process.pid, process.create_time())
                    rss = process.memory_info().rss
                    cpu = process.cpu_times()
                    io = self._process_io(process)
            except (psutil.Error, OSError):
                continue
            cpu_seconds = cpu.user + cpu.system
            current[identity] = cpu_seconds, io
            group = groups.setdefault(role, {'count': 0, 'rss_bytes': 0,
                                             'cpu_percent_of_one_core': None,
                                             'process_read_bytes': None, 'process_write_bytes': None})
            group['count'] += 1
            group['rss_bytes'] += rss
            if elapsed and identity in self._previous:
                old_cpu, old_io = self._previous[identity]
                group['cpu_percent_of_one_core'] = round(
                    (group['cpu_percent_of_one_core'] or 0) + max(0, cpu_seconds - old_cpu) * 100 / elapsed, 1)
                if io is not None and old_io is not None:
                    for key, total, previous in zip(('process_read_bytes', 'process_write_bytes'), io, old_io):
                        group[key] = (group[key] or 0) + max(0, total - previous)
        self._sample_time, self._previous = sampled, current
        with self._lock:
            self._resources.append({'at': _timestamp(), 'interval_seconds': round(elapsed, 2) if elapsed else None,
                                    'host_available_memory_bytes': psutil.virtual_memory().available,
                                    'processes': groups})

    @staticmethod
    def _process_io(process):
        try:
            io = process.io_counters()
            return io.read_bytes, io.write_bytes
        except (psutil.Error, OSError, AttributeError, NotImplementedError):
            return None

    async def run(self):
        while True:
            try:
                await asyncio.to_thread(self.collect)
            except (psutil.Error, OSError):
                pass
            await asyncio.sleep(SAMPLE_SECONDS)

    def first_body(self, **values):
        with self._lock:
            self._playback.append({'at': _timestamp(), **values})

    def snapshot(self):
        with self._lock:
            return {
                'scope': 'server-and-descendants',
                'status': 'available' if self._resources else 'unavailable',
                'sample_seconds': SAMPLE_SECONDS,
                'resource_samples': list(self._resources),
                'media_first_body_samples': list(self._playback),
            }


class MediaDeliveryTimings:
    """执行发送后记录首段非空媒体响应。只采初始请求与慢的后续请求。"""
    def __init__(self, app, *, diagnostics):
        self.app = app
        self.diagnostics = diagnostics

    async def __call__(self, scope, receive, send):
        if scope.get('method') != 'GET' or not scope['path'].startswith(
                ('/stream', '/follow-stream', '/strm-resource/', '/external-stream/')):
            await self.app(scope, receive, send)
            return
        started = monotonic()
        status = None
        first = True

        async def measure(message):
            nonlocal status, first
            await send(message)
            if message['type'] == 'http.response.start':
                status = message['status']
            elif first and status in (200, 206) and message.get('body'):
                first = False
                elapsed = round((monotonic() - started) * 1000, 1)
                headers = dict(scope['headers'])
                byte_range = headers.get(b'range', b'')
                initial = not byte_range or byte_range.startswith(b'bytes=0-')
                route = MEDIA_ROUTES.get(getattr(scope.get('route'), 'path', ''))
                if route == 'hls-segment':
                    initial = scope.get('path_params', {}).get('index') == '0'
                if route and (elapsed >= SLOW_FIRST_BODY_MS or (initial and route != 'pointer')):
                    self.diagnostics.first_body(
                        route=route, elapsed_ms=elapsed, http_status=status, initial_range=initial,
                        source=scope.get('peach.media_source'), edge_header_present=b'cf-ray' in headers)

        await self.app(scope, receive, measure)
