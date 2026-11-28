"""本机的可选后台预计算设置。"""
import json
from pathlib import Path

from .fsutil import atomic_write_text
from .user_messages import UserValueError


FILENAME = "background-work.json"


def enabled(state_root: Path) -> bool:
    try:
        state = json.loads((state_root / FILENAME).read_text(encoding="utf-8"))
    except (OSError, ValueError):
        return False
    return isinstance(state, dict) and state.get("precompute") is True


def save(state_root: Path, precompute: object) -> bool:
    if type(precompute) is not bool:
        raise UserValueError("errors.backgroundWork.invalidPrecompute")
    atomic_write_text(state_root / FILENAME, json.dumps({"precompute": precompute}) + "\n")
    return precompute
