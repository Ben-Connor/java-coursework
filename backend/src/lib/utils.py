from datetime import datetime, timezone

from ..configuration.configuration import CONFIGURATION


def frontend_url(path: str = "") -> str:
    return f"{CONFIGURATION.FRONTEND_BASE_URL}{path}"


def backend_url(path: str = "") -> str:
    return f"{CONFIGURATION.BACKEND_BASE_URL}{path}"


def now() -> datetime:
    return datetime.now(timezone.utc)
