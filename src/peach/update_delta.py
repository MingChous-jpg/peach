"""用签名包里的清单将本机文件复用到 Windows 更新暂存目录。"""
from __future__ import annotations

import hashlib
import json
from pathlib import Path
import re

from .update_packages import checked_path
from .user_messages import UserValueError


MANIFEST = "delta-manifest.json"


def name(version: str, base: str) -> str:
    return f"Peach-{version}-windows-x64-from-{base}.zip"


def reassemble(installed: Path, stage: Path, base: str, version: str, *, max_bytes: int, progress) -> None:
    plan = stage / MANIFEST
    if plan.stat().st_size > 2 * 1024 * 1024:
        raise UserValueError("errors.updatePackages.manifestInvalid")
    body = json.loads(plan.read_text(encoding="utf-8"))
    if not isinstance(body, dict) or (body.get("format"), body.get("base"), body.get("version")) != (1, base, version):
        raise UserValueError("errors.updatePackages.manifestInvalid")
    reuse = body.get("reuse")
    if not isinstance(reuse, dict) or len(reuse) > 20000:
        raise UserValueError("errors.updatePackages.fileListInvalid")
    extracted = [path for path in stage.rglob("*") if path.is_file()]
    names = {path.relative_to(stage).as_posix().casefold() for path in extracted}
    reserved = sum(path.stat().st_size for path in extracted)
    for index, (relative, entry) in enumerate(reuse.items()):
        if (relative.casefold() in names or not isinstance(entry, list) or len(entry) != 2
                or type(entry[0]) is not int or entry[0] < 0 or not isinstance(entry[1], str)
                or re.fullmatch(r"[0-9a-f]{64}", entry[1]) is None):
            raise UserValueError("errors.updatePackages.fileListInvalid")
        size, expected = entry
        reserved += size
        if reserved > max_bytes:
            raise UserValueError("errors.standaloneUpdate.expandedTooLarge")
        names.add(relative.casefold())
        source = checked_path(installed, relative)
        destination = checked_path(stage, relative)
        _copy_checked(source, destination, size, expected)
        progress(index + 1, len(reuse))
    plan.unlink()


def _copy_checked(source: Path, destination: Path, size: int, expected: str) -> None:
    if not source.is_file() or source.stat().st_size != size:
        raise UserValueError("errors.standaloneUpdate.checksumFailed")
    destination.parent.mkdir(parents=True, exist_ok=True)
    checksum = hashlib.sha256()
    with source.open("rb") as reader, destination.open("xb") as output:
        remaining = size
        while chunk := reader.read(min(1 << 20, remaining + 1)):
            remaining -= len(chunk)
            if remaining < 0:
                raise UserValueError("errors.standaloneUpdate.checksumFailed")
            checksum.update(chunk)
            output.write(chunk)
    if remaining or checksum.hexdigest() != expected:
        raise UserValueError("errors.standaloneUpdate.checksumFailed")
