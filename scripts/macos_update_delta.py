"""生成、实际应用并签名 Sparkle 二进制增量包。"""
import argparse
from contextlib import contextmanager
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))
from release_update_base import download_previous
from sparkle_appcast import add_delta


@contextmanager
def mounted(dmg: Path, directory: Path):
    directory.mkdir()
    subprocess.run(["hdiutil", "attach", str(dmg), "-readonly", "-nobrowse", "-mountpoint", str(directory)],
                   check=True, stdout=sys.stderr)
    try:
        yield directory / "Peach.app"
    finally:
        subprocess.run(["hdiutil", "detach", str(directory)], check=True, stdout=sys.stderr)


def generate(args, key: str) -> Path | None:
    with tempfile.TemporaryDirectory(prefix="peach-macos-delta-") as directory:
        scratch = Path(directory)
        previous = download_previous(scratch, args.version, f"macos-{args.arch}.dmg")
        if previous is None:
            return None
        base, old_dmg = previous
        patch = scratch / f"Peach-{args.version}-macos-{args.arch}-from-{base}.delta"
        tool = str(args.tools / "BinaryDelta")
        with mounted(old_dmg, scratch / "old") as old, mounted(args.dmg, scratch / "current") as current:
            subprocess.run([tool, "create", "--version=4", str(old), str(current), str(patch)], check=True, stdout=sys.stderr)
            if patch.stat().st_size >= args.dmg.stat().st_size:
                return None
            rebuilt = scratch / "Peach.app"
            subprocess.run([tool, "apply", str(old), str(rebuilt), str(patch)], check=True, stdout=sys.stderr)
            subprocess.run(["codesign", "--verify", "--deep", "--strict", str(rebuilt)], check=True, stdout=sys.stderr)
        signing = str(args.tools / "sign_update")
        signature = subprocess.run([signing, "--ed-key-file", "-", "-p", str(patch)], input=key,
                                   check=True, encoding="utf-8", stdout=subprocess.PIPE).stdout.strip()
        subprocess.run([signing, "--ed-key-file", "-", "--verify", str(patch), signature],
                       input=key, check=True, encoding="utf-8", stdout=sys.stderr)
        output = args.appcast.parent / patch.name
        shutil.copyfile(patch, output)
        add_delta(args.appcast, args.version, base, output, args.delta_url_prefix, signature)
        return output


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--appcast", required=True, type=Path)
    parser.add_argument("--dmg", required=True, type=Path)
    parser.add_argument("--tools", required=True, type=Path)
    parser.add_argument("--version", required=True)
    parser.add_argument("--arch", choices=("arm64", "x86_64"), required=True)
    parser.add_argument("--delta-url-prefix", required=True)
    args = parser.parse_args()
    if output := generate(args, sys.stdin.read()):
        print(output)


if __name__ == "__main__":
    main()
