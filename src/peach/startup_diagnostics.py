"""Bounded startup evidence retained on faults or on a programmatic request."""
from __future__ import annotations

import json
import logging
import os
import time
import uuid
from contextlib import contextmanager
from contextvars import ContextVar
from pathlib import Path

import psutil
from filelock import FileLock, Timeout

from .fsutil import atomic_write_text

NAME = "startup-diagnostics.json"
TICKET_ENV = "PEACH_STARTUP_DIAGNOSTIC_TICKET"
REASON_ENV = "PEACH_STARTUP_DIAGNOSTIC_REASON"
CONTAINER_MS_ENV = "PEACH_STARTUP_CONTAINER_MS"
MAX_STAGES = 40
SLOW_START_MS = 30_000
REASONS = ("restart_recovery", "update_verification", "workflow_probe")
MOUNT_ISSUES = {"permission_denied", "missing", "not_directory", "unavailable", "unmapped", "timeout", "checking"}
ROLES = {"desktop", "supervisor", "web"}
STAGES = {
    "container_preparation", "configuration", "desktop_services", "desktop_dependencies",
    "ledger_migration", "launch_services", "access", "bind_listener", "assemble_web",
    "activate_ledger", "mount_monitor", "mdns", "tls", "web_startup", "http_redirect",
}
STATES = {"capturing", "completed", "failed", "interrupted"}
MOUNT_STATES = {"ok", "permission_denied", "missing", "not_directory", "unavailable", "unmapped", "checking", "timeout"}
_current: ContextVar[tuple[Path, str, str] | None] = ContextVar("startup_capture", default=None)
_log = logging.getLogger(__name__)


def _now() -> int:
    return time.time_ns() // 1_000_000


def _read(path: Path) -> dict:
    try:
        with path.open("rb") as stream:
            data = stream.read(64 * 1024 + 1)
    except FileNotFoundError:
        return {}
    if len(data) > 64 * 1024:
        raise ValueError("Unexpected startup diagnostics size")
    value = json.loads(data)
    if not isinstance(value, dict):
        raise ValueError("Invalid startup diagnostics")
    run = value.get("run")
    if run is not None and (not isinstance(run, dict) or not isinstance(run.get("stages"), list)):
        raise ValueError("Invalid startup diagnostics run")
    return value


def _write(path: Path, value: dict) -> None:
    atomic_write_text(path, json.dumps(value, ensure_ascii=True) + "\n")


def _owner_alive(run: dict) -> bool:
    try:
        return psutil.Process(run["pid"]).create_time() == run["process_started_at"]
    except psutil.AccessDenied:
        return True
    except (psutil.NoSuchProcess, KeyError, TypeError, ValueError, OverflowError):
        return False


def _status(run: dict) -> str:
    status = run.get("status", "")
    return "interrupted" if status == "capturing" and not _owner_alive(run) else status


def _retain(run: dict) -> bool:
    status = _status(run)
    if status in {"capturing", "completed"}:
        end = _now() if status == "capturing" else run["finished_at"]
        if end - run["started_at"] >= SLOW_START_MS:
            return True
    return (run.get("reason") in REASONS or status in {"failed", "interrupted"}
            or any(row.get("status") in {"failed", "unavailable"} for row in run.get("stages", []))
            or bool(MOUNT_ISSUES.intersection(run.get("mounts", {}))))


def snapshot(state: Path) -> dict:
    """Public projection shared by settings and the local support ZIP."""
    try:
        saved = _read(state / NAME)
        run = saved.get("run") or {}
        if not _retain(run):
            run = saved.get("last") or {}
        capture = None
        if run.get("status") in STATES:
            stages = []
            for row in run.get("stages", [])[:MAX_STAGES]:
                if (isinstance(row, dict) and row.get("role") in ROLES and row.get("stage") in STAGES
                        and row.get("status") in {"running", "completed", "failed", "unavailable"}):
                    stages.append({key: row[key] for key in ("role", "stage", "status")} |
                                  {key: row[key] for key in ("elapsed_ms", "started_at")
                                   if type(row.get(key)) is int and row[key] >= 0})
            capture = {"status": _status(run), "stages": stages}
            if run.get("reason") in REASONS:
                capture["reason"] = run["reason"]
            if isinstance(run.get("mounts"), dict):
                capture["mounts"] = {key: count for key, count in run["mounts"].items()
                                     if key in MOUNT_STATES and type(count) is int and count > 0}
            for key in ("started_at", "finished_at"):
                if type(run.get(key)) is int:
                    capture[key] = run[key]
        return {"available": True, "pending": saved.get("request") in REASONS, "capture": capture}
    except (OSError, ValueError, TypeError, AttributeError, KeyError):
        return {"available": False, "pending": False, "capture": None}


def request(state: Path, reason: str) -> dict:
    """Keep the next startup report when a task has identified a concrete reason."""
    if reason not in REASONS:
        raise ValueError("Unknown startup diagnostics trigger")
    path = state / NAME
    path.parent.mkdir(parents=True, exist_ok=True)
    with FileLock(path.with_suffix(".lock"), timeout=2):
        saved = _read(path)
        saved["request"] = reason
        _write(path, saved)
    return snapshot(state)


def _claim(state: Path, inherited: str, reason: str) -> str | None:
    path = state / NAME
    path.parent.mkdir(parents=True, exist_ok=True)
    with FileLock(path.with_suffix(".lock"), timeout=2):
        saved = _read(path)
        run = saved.get("run") or {}
        if _status(run) == "capturing":
            return inherited if inherited and inherited == run.get("id") else None
        if _retain(run):
            saved["last"] = {**run, "status": _status(run)}
        reason = saved.pop("request", None) or reason or os.environ.get(REASON_ENV, "")
        saved.pop("armed_at", None)
        identity = uuid.uuid4().hex
        saved["run"] = {"id": identity, "pid": os.getpid(), "process_started_at": psutil.Process().create_time(),
                        "status": "capturing", "started_at": _now(), "stages": []}
        if reason in REASONS:
            saved["run"]["reason"] = reason
        _write(path, saved)
        return identity


def _update(change, *, include_completed: bool = False):
    capture = _current.get()
    if capture is None:
        return None
    path, identity, role = capture
    try:
        with FileLock(path.with_suffix(".lock"), timeout=2):
            saved = _read(path)
            run = saved.get("run") or {}
            states = ("capturing", "completed") if include_completed else ("capturing",)
            if run.get("id") != identity or run.get("status") not in states:
                return None
            result = change(run, role)
            _write(path, saved)
            return result
    except (OSError, ValueError, Timeout):
        _log.warning("Could not update the local startup diagnostics report")
        return None


@contextmanager
def recording(state: Path, role: str, *, inherited: str = "", reason: str = ""):
    try:
        identity = _claim(state, inherited, reason)
    except (OSError, ValueError, KeyError, TypeError, AttributeError, Timeout, psutil.Error):
        _log.warning("Could not start the local startup diagnostics report")
        identity = None
    token = _current.set((state / NAME, identity, role) if identity else None)
    try:
        yield
    except BaseException:
        finish("failed")
        raise
    finally:
        _current.reset(token)


def environment() -> dict[str, str]:
    capture = _current.get()
    return {TICKET_ENV: capture[1]} if capture else {}


def active() -> bool:
    return _current.get() is not None


def stage_result(stage: str, status: str, elapsed_ms: int | None = None) -> None:
    def add(run, role):
        if len(run["stages"]) < MAX_STAGES:
            row = {"role": role, "stage": stage, "status": status, "started_at": _now()}
            if elapsed_ms is not None:
                row["elapsed_ms"] = elapsed_ms
            run["stages"].append(row)
    _update(add)


def redirect_failed(state: Path, inherited: str, elapsed_ms: int) -> None:
    """The HTTP redirect runs alongside the app and only contributes a stage when it fails."""
    token = _current.set((state / NAME, inherited, "web"))
    try:
        def update(run, role):
            if len(run["stages"]) < MAX_STAGES:
                run["stages"].append({"role": role, "stage": "http_redirect", "status": "failed",
                                      "elapsed_ms": elapsed_ms})
            run.update(status="failed", finished_at=_now())
        _update(update, include_completed=True)
    finally:
        _current.reset(token)


def mount_results(counts: dict[str, int]) -> None:
    _update(lambda run, _role: run.update(mounts=counts), include_completed=True)


@contextmanager
def stage(name: str):
    if not active():
        yield lambda _status: None
        return
    started = time.monotonic_ns()

    def start(run, role):
        index = len(run["stages"])
        if index >= MAX_STAGES:
            return None
        run["stages"].append({"role": role, "stage": name, "status": "running", "started_at": _now()})
        return index

    index = _update(start)
    status = "completed"

    def outcome(result: str) -> None:
        nonlocal status
        status = result

    try:
        yield outcome
    except BaseException:
        status = "failed"
        raise
    finally:
        if index is not None:
            elapsed = (time.monotonic_ns() - started) // 1_000_000
            _update(lambda run, _role: run["stages"][index].update(status=status, elapsed_ms=elapsed),
                    include_completed=True)


def finish(status: str) -> None:
    _update(lambda run, _role: run.update(status=status, finished_at=_now()))
