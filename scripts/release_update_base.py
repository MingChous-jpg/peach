"""读取最近一个有对应安装制品的公开版本，并按发布签名验证。"""
from pathlib import Path
import re
import sys

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))

from peach import release_signing, release_updates
from peach.peach_proxy import http_client
from peach.standalone_update import _fetch_small, checked_asset, download


def version_key(text: str) -> tuple[int, ...]:
    if not isinstance(text, str) or not re.fullmatch(r"\d+\.\d+\.\d+", text):
        raise ValueError(f"Invalid release version: {text}")
    return tuple(map(int, text.split(".")))


def download_previous(output: Path, version: str, suffix: str) -> tuple[str, Path] | None:
    current = version_key(version)
    with http_client(follow_redirects=True, timeout=30) as client:
        response = client.get(release_updates.API_URL, params={"per_page": 30})
        response.raise_for_status()
        rows = response.json()
        candidates = []
        for release in rows:
            base = release["tag_name"].removeprefix("v")
            if release.get("draft") or not re.fullmatch(r"\d+\.\d+\.\d+", base) or version_key(base) >= current:
                continue
            filename = f"Peach-{base}-{suffix}"
            for asset in release.get("assets", []):
                if asset.get("name") == filename and asset.get("state") == "uploaded":
                    candidates.append((base, asset))
        if not candidates:
            return None
        base, asset = max(candidates, key=lambda item: version_key(item[0]))
        directory = f"{release_updates.RELEASES_URL}/download/v{base}"
        sums = _fetch_small(client, f"{directory}/{release_signing.SUMS}")
        signature = _fetch_small(client, f"{directory}/{release_signing.SIGNATURE}")
    digests = release_signing.verify(sums, signature)
    filename = asset["name"]
    checksum, size = checked_asset("sha256:" + digests[filename], asset["size"], filename)
    previous = output / filename
    download(f"{directory}/{filename}", previous, size, checksum, lambda _: None)
    return base, previous
