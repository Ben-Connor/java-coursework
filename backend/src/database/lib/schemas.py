from typing import NamedTuple

from .consts import PoolType


class EngineSettings(NamedTuple):
    is_async: bool
    pool_type: PoolType
