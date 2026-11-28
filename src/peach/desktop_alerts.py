"""桌面故障提醒的本机偏好与持续故障去重。"""
from __future__ import annotations

import json
import sys
import time

from . import distribution
from .fsutil import atomic_write_text

FILENAME = "desktop-alerts.json"
FAULT_DELAY = 45.0


def available() -> bool:
    return sys.platform in ("win32", "darwin") and not distribution.docker()


def enabled(state_root) -> bool:
    try:
        saved = json.loads((state_root / FILENAME).read_text(encoding="utf-8"))
    except (OSError, ValueError):
        return True
    return not isinstance(saved, dict) or saved.get("enabled") is not False


def save(state_root, value: bool) -> None:
    atomic_write_text(state_root / FILENAME, json.dumps({"enabled": value}) + "\n")


def health_faults(payload: dict) -> set[str]:
    if payload.get("configured") is False:
        return set()
    issues = set()
    if payload.get("db") in ("corrupt", "unavailable", "missing", "empty"):
        issues.add("database")
    mounts = payload.get("media_mounts")
    if isinstance(mounts, dict) and mounts.get("state") == "degraded":
        issues.add("mounts")
    if payload.get("media_capacity_paused") is True:
        issues.add("capacity")
    return issues


class FaultMonitor:
    def __init__(self, clock=time.monotonic):
        self._clock = clock
        self._since: dict[str, float] = {}
        self._sent: set[str] = set()

    def remember(self, active: set[str]) -> None:
        self._sent.update(active)

    def observe(self, active: set[str], *, allowed: bool) -> tuple[str, ...]:
        if not allowed:
            self._since.clear()
            self._sent.clear()
            return ()
        now = self._clock()
        self._since = {issue: self._since.get(issue, now) for issue in active}
        self._sent.intersection_update(active)
        fresh = tuple(sorted(issue for issue, since in self._since.items()
                             if issue not in self._sent and now - since >= FAULT_DELAY))
        self._sent.update(fresh)
        return fresh
