"""PikPak 的同来源整理直连 PikPak 自家 API（不经 CloudDrive2）。

与 `organize_clouddrive.pikpak_renames` 同一契约（`organize.verified_renames` 注入 +
`PikPakDav` 的移动/完整成员核验语义），只把传输换成 `api-drive.mypikpak.com` 的直连接口，
凭据用设置页登录的 `PIKPAK_CREDENTIAL`（`downloads_pikpak`）。协议照 PyPI `PikPakAPI`
0.1.11（GPL-3.0-only，Quan666/PikPakAPI）：同父改名 `PATCH /drive/v1/files/{id}`（body
`name`），跨目录移动 `POST /drive/v1/files:batchMove`（body `ids` + `to.parent_id`），建目录
`POST /drive/v1/files`（body `kind=drive#folder`），列目录 `GET /drive/v1/files`
（query `parent_id`/`filters`）。那份实现没有 collision 参数；重名冲突由 `PikPakDav.move`
在移动前检查目标不存在规避，完整成员核验兜底。

官方接口的回答同样不能代替目录证据：改名回包只是提交结果，生效与否由 `PikPakDav` 读官方
目录确认。整批持 `SESSION_LOCK`：PikPak 每次刷新都轮换 refresh token，一个部署同时只允许
一个刷新者（`downloads_pikpak` 的约定）。

直连时「推送发现」里配的云端前缀是**账号根之内**的路径（如 `/Movies`）：`mapping.remote`
逐段从账号根解析出媒体根的文件夹 id，账本根与它对应。
"""
from __future__ import annotations

from contextlib import contextmanager
from pathlib import PurePosixPath, PureWindowsPath

from . import organize
from .config import SECRETS_DIR, STATE_DIR
from .downloads import DownloadError, PIKPAK_CREDENTIAL
from .downloads_pikpak import PikPakClient, SESSION_LOCK
from .follow_secrets import CredentialStore
from .organize_clouddrive import ACCEPTED, MAX_FILES, REJECTED, PikPakDav
from .organize_clouddrive import _configured_paths
from .push_discovery import PushDiscoverySettings

#: 祖先链遍历的层级预算，与 `organize_clouddrive._cloud_listing` 一致。
MAX_DEPTH = 32
#: 确定性拒绝的失败类别：原样重提只会得到同样的回答，原件仍在原处。其余类别（网络、认证、
#: 回包变形）是「没取得回答」，由 `PikPakDav` 的确认预算裁决。
REJECTED_FAILURES = frozenset({'rejected', 'invalid_link', 'quota'})


def _submit_status(error: DownloadError) -> int | None:
    return REJECTED if error.failure in REJECTED_FAILURES else None


def _row(item: dict, parent: PureWindowsPath) -> dict:
    """PikPak 文件条目 → 官方目录行（`path`/`size`/`directory`，另带 `id` 供提交用）。"""
    name = str(item.get('name') or '')
    if (not name or name in ('.', '..') or any(char in name for char in '/\\:')
            or any(ord(char) < 32 for char in name)):
        raise ValueError('官方目录成员名称无效')
    try:
        size = int(item.get('size') or 0)
    except (TypeError, ValueError):
        raise ValueError('官方目录成员体积无效') from None
    file_id = str(item.get('id') or '')
    if size < 0 or not file_id:
        raise ValueError('官方目录成员体积无效或没有 id')
    return dict(path=str(parent / name), size=size,
                directory='folder' in str(item.get('kind') or ''), id=file_id)


def _children_rows(client: PikPakClient, parent_id: str, parent: PureWindowsPath) -> list[dict]:
    rows, seen = [], set()
    for item in client._children(parent_id):
        row = _row(item, parent)
        key = row['path'].casefold()
        if key in seen:
            raise ValueError('官方目录成员越界、重名或体积无效')
        seen.add(key)
        rows.append(row)
        if len(rows) > MAX_FILES:
            raise ValueError('官方目录成员超过预算')
    return rows


def _root_id(client: PikPakClient, mapping) -> str:
    """已声明媒体根 → PikPak 文件夹 id：`mapping.remote` 逐段从账号根解析。"""
    parent_id = ''
    for part in [item for item in PurePosixPath(mapping.remote).parts if item != '/']:
        found = [item for item in client._children(parent_id)
                 if str(item.get('name') or '').casefold() == part.casefold()
                 and 'folder' in str(item.get('kind') or '')]
        if len(found) != 1:
            raise FileNotFoundError('官方目录未列出所需目录')
        parent_id = str(found[0].get('id') or '')
        if not parent_id:
            raise ValueError('官方目录成员没有 id')
    return parent_id


def _api_listing(client: PikPakClient, path: str, mapping) -> list[dict]:
    """逐层完整读取官方目录成员（`organize_clouddrive._cloud_listing` 的直连版）。"""
    relative = mapping.relative(path)
    if len(relative) > MAX_DEPTH:
        raise ValueError('官方目录路径超过层级预算')
    parent = PureWindowsPath(mapping.root)
    rows = _children_rows(client, _root_id(client, mapping), parent)
    for name in relative:
        parent = parent / name
        found = [row for row in rows if PureWindowsPath(row['path']) == parent and row['directory']]
        if len(found) != 1:
            raise FileNotFoundError('官方父目录未列出所需目录')
        rows = _children_rows(client, found[0]['id'], parent)
    return rows


def _resolve(client: PikPakClient, path: str, mapping) -> dict:
    item = PureWindowsPath(path)
    for row in _api_listing(client, str(item.parent), mapping):
        if PureWindowsPath(row['path']) == item:
            return row
    raise FileNotFoundError('官方目录未列出所需条目')


def _dir_id(client: PikPakClient, path: str, mapping) -> str:
    """目录 → PikPak 文件夹 id；账本根本身对应 `mapping.remote` 解析出的媒体根文件夹。"""
    if PureWindowsPath(path) == PureWindowsPath(mapping.root):
        return _root_id(client, mapping)
    row = _resolve(client, path, mapping)
    if not row['directory']:
        raise ValueError('目标父路径不是目录')
    return row['id']


def _rename_remote(client: PikPakClient, source: str, target: str, mapping) -> int | None:
    """官方同父改名；回包只是提交结果，生效与否由调用方读官方目录确认。"""
    old, new = PureWindowsPath(source), PureWindowsPath(target)
    mapping.relative(target)
    if old.parent != new.parent or PureWindowsPath(mapping.root) in (old, new):
        raise ValueError('官方改名只支持已声明来源内的同父目录')
    entry = _resolve(client, source, mapping)
    try:
        client.rename_file(entry['id'], new.name)
        return ACCEPTED
    except DownloadError as error:
        return _submit_status(error)


def _move_remote(client: PikPakClient, source: str, target: str, mapping) -> int | None:
    """官方同来源移动保持原名；`batchMove` 没有 collision 参数，目标不存在由调用方预先检查。"""
    old, new = PureWindowsPath(source), PureWindowsPath(target)
    if (old.name != new.name or old.parent == new.parent
            or PureWindowsPath(mapping.root) in (old, new)):
        raise ValueError('官方移动来源、父目录或文件名不符')
    entry = _resolve(client, source, mapping)
    destination = _dir_id(client, str(new.parent), mapping)
    try:
        client.batch_move([entry['id']], destination)
        return ACCEPTED
    except DownloadError as error:
        return _submit_status(error)


def _mkdir(client: PikPakClient, mapping, path: str) -> None:
    name = PureWindowsPath(path).name
    parent_id = _dir_id(client, str(PureWindowsPath(path).parent), mapping)
    try:
        client.create_folder(parent_id, name)
    except DownloadError as error:
        raise OSError('PikPak 创建父目录失败：' + str(error)) from None


@contextmanager
def pikpak_renames(sample_path: str, roots):
    """凭设置页的 PikPak 登录直连整理；不经 CloudDrive2。"""
    prefixes = PushDiscoverySettings(STATE_DIR).load(roots).prefixes
    mapping = _configured_paths(sample_path, roots, prefixes)
    credential = CredentialStore(SECRETS_DIR).load(PIKPAK_CREDENTIAL)
    if not credential or not credential.values.get('refresh_token'):
        raise ValueError('PikPak 登录未取得，请在设置页登录 PikPak')
    values = dict(credential.values)

    def persist(update: dict) -> None:
        values.update(update)
        CredentialStore(SECRETS_DIR).save(PIKPAK_CREDENTIAL, values)

    with SESSION_LOCK:
        with PikPakClient(values, persist=persist) as client:
            dav = PikPakDav(None, mapping, lambda path: None,
                            listing=lambda path: _api_listing(client, path, mapping),
                            rename=lambda source, target: _rename_remote(client, source, target, mapping),
                            move_remote=lambda source, target: _move_remote(client, source, target, mapping),
                            mkdir=lambda path: _mkdir(client, mapping, path),
                            confirm_attempts=4)
            with organize.verified_renames('pikpak', dav.move):
                yield dav
