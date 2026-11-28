"""生成并验证上一版到本版的 Windows 增量更新包。"""
from __future__ import annotations

import argparse
import hashlib
import json
from pathlib import Path
import shutil
import sys
import tempfile
import zipfile

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
sys.path.insert(0, str(ROOT / "src"))
from peach import update_delta
from peach.standalone_update import MAX_EXPANDED, extract
from peach.update_packages import MANIFEST
from release_update_base import download_previous, version_key


def _inventory(package: zipfile.ZipFile) -> dict[str, zipfile.ZipInfo]:
    return {item.filename: item for item in package.infolist() if not item.is_dir()}


def _hash(package: zipfile.ZipFile, member: zipfile.ZipInfo) -> str:
    with package.open(member) as stream:
        return hashlib.file_digest(stream, "sha256").hexdigest()


def create(previous: Path, current: Path, output: Path, base: str, version: str) -> Path | None:
    if version_key(base) >= version_key(version):
        raise ValueError("A delta requires an older source release")
    output.mkdir(parents=True, exist_ok=True)
    destination = output / update_delta.name(version, base)
    with tempfile.TemporaryDirectory(prefix="delta-", dir=output) as directory:
        scratch = Path(directory)
        archive = scratch / destination.name
        with zipfile.ZipFile(previous) as old, zipfile.ZipFile(current) as new:
            prior = _inventory(old)
            target = _inventory(new)
            reuse = {}
            with zipfile.ZipFile(archive, "w", compression=zipfile.ZIP_DEFLATED) as patch:
                for path, member in target.items():
                    previous_member = prior.get(path)
                    if (path != f"Peach/{MANIFEST}" and previous_member is not None
                            and (previous_member.file_size, previous_member.CRC) == (member.file_size, member.CRC)
                            and (checksum := _hash(new, member)) == _hash(old, previous_member)):
                        reuse[path.removeprefix("Peach/")] = [member.file_size, checksum]
                    else:
                        with new.open(member) as source, patch.open(path, "w") as sink:
                            shutil.copyfileobj(source, sink, length=1 << 20)
                patch.writestr(f"Peach/{update_delta.MANIFEST}",
                               json.dumps({"format": 1, "base": base, "version": version, "reuse": reuse},
                                          ensure_ascii=False, sort_keys=True))
            if not reuse or archive.stat().st_size >= current.stat().st_size:
                return None
            _verify(previous, new, target, archive, scratch, base, version)
        archive.replace(destination)
    return destination


def _verify(previous, current, target, patch, scratch, base, version):
    source = extract(previous, scratch / "installed", lambda *_: None)
    stage = extract(patch, scratch / "stage", lambda *_: None, require_app=False)
    update_delta.reassemble(source, stage, base, version, max_bytes=MAX_EXPANDED, progress=lambda *_: None)
    paths = {f"Peach/{p.relative_to(stage).as_posix()}": p for p in stage.rglob("*") if p.is_file()}
    if set(paths) != set(target):
        raise ValueError("Delta reconstruction changed the target file set")
    for name, path in paths.items():
        with path.open("rb") as stream:
            if hashlib.file_digest(stream, "sha256").hexdigest() != _hash(current, target[name]):
                raise ValueError(f"Delta reconstruction changed {name}")


def from_release(output: Path, version: str) -> Path | None:
    with tempfile.TemporaryDirectory(prefix="peach-delta-base-") as directory:
        candidate = download_previous(Path(directory), version, "windows-x64-update.zip")
        if candidate is None:
            return None
        base, previous = candidate
        return create(previous, output / f"Peach-{version}-windows-x64-update.zip", output, base, version)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", required=True, type=Path)
    parser.add_argument("--version", required=True)
    parser.add_argument("--base-archive", type=Path)
    parser.add_argument("--base-version")
    args = parser.parse_args()
    if bool(args.base_archive) != bool(args.base_version):
        parser.error("--base-archive and --base-version must be specified together")
    if args.base_archive:
        result = create(args.base_archive, args.output / f"Peach-{args.version}-windows-x64-update.zip",
                        args.output, args.base_version, args.version)
    else:
        result = from_release(args.output, args.version)
    print(json.dumps({"delta": result.name if result else None, "bytes": result.stat().st_size if result else None}))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
