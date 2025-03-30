from enum import StrEnum

from sqlalchemy.pool import NullPool, QueuePool, Pool, StaticPool


class PoolType(StrEnum):
    QUEUE_POOL = "QUEUE_POOL"
    NULL_POOL = "NULL_POOL"
    STATIC_POOL = "STATIC_POOL"

    def to_pool_class(self) -> Pool:
        return _POOL_TYPE_TO_POOL_CLASS[self]


_POOL_TYPE_TO_POOL_CLASS: dict[PoolType, Pool] = {
    PoolType.QUEUE_POOL: QueuePool,
    PoolType.NULL_POOL: NullPool,
    PoolType.STATIC_POOL: StaticPool,
}
CONNECT_EVENT = "connect"
