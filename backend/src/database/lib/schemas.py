from typing import NamedTuple, Any

from .consts import PoolType


class EngineSettings(NamedTuple):
    is_async: bool
    pool_type: PoolType
    connection_kwargs: tuple[tuple[Any, Any], ...]
