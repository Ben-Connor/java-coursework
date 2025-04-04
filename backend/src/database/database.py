from typing import overload, Literal, Any

from sqlite3 import Connection

from sqlalchemy import Engine, create_engine, event
from sqlalchemy.pool.base import _ConnectionRecord
from sqlmodel import Session
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlalchemy.ext.asyncio import create_async_engine, AsyncEngine

from .begun_session import BegunSession, AsyncBegunSession
from .lib.schemas import EngineSettings
from .lib.consts import PoolType, CONNECT_EVENT
from ..configuration import CONFIGURATION


_ENGINES: dict[EngineSettings, Engine | AsyncEngine] = {}


def _sqlite_foreign_keys_on(connection: Connection, connection_record: _ConnectionRecord) -> None:
    connection.execute("PRAGMA foreign_keys=ON")


@overload
def get_engine(*, is_async: Literal[False] = ..., pool_type: PoolType = ..., **connection_kwargs: Any) -> Engine:
    ...


@overload
def get_engine(*, is_async: Literal[True] = ..., pool_type: PoolType = ..., **connection_kwargs: Any) -> AsyncEngine:
    ...


@overload
def get_engine(*, is_async: bool = ..., pool_type: PoolType = ..., **connection_kwargs: Any) -> Engine | AsyncEngine:
    ...


def get_engine(*, is_async: bool = False, pool_type: PoolType = PoolType.QUEUE_POOL, **connection_kwargs: Any) -> Engine | AsyncEngine:
    engine_settings = EngineSettings(is_async, pool_type, tuple(connection_kwargs.items()))
    cached_engine = _ENGINES.get(engine_settings)
    if cached_engine is not None:
        return cached_engine
    engine_creator = create_async_engine if is_async else create_engine
    engine = engine_creator(
        CONFIGURATION.DATABASE_URL,
        poolclass=pool_type.to_pool_class(),
        connect_args=connection_kwargs,
    )
    if CONFIGURATION.IS_SQLITE:
        event.listen(engine, CONNECT_EVENT, _sqlite_foreign_keys_on)
    _ENGINES[engine_settings] = engine
    return engine


def get_async_engine(*, pool_type: PoolType = PoolType.QUEUE_POOL, **connection_kwargs: Any) -> AsyncEngine:
    return get_engine(is_async=True, pool_type=pool_type, **connection_kwargs)


@overload
def get_session(*, begun: Literal[True] = ..., is_async: Literal[False] = ..., pool_type: PoolType = ..., **connection_kwargs: Any) -> BegunSession:
    ...


@overload
def get_session(*, begun: Literal[True] = ..., is_async: Literal[True] = ..., pool_type: PoolType = ..., **connection_kwargs: Any) -> AsyncBegunSession:
    ...


@overload
def get_session(*, begun: Literal[False] = ..., is_async: Literal[False] = ..., pool_type: PoolType = ..., **connection_kwargs: Any) -> Session:
    ...


@overload
def get_session(*, begun: Literal[False] = ..., is_async: Literal[True] = ..., pool_type: PoolType = ..., **connection_kwargs: Any) -> AsyncSession:
    ...


@overload
def get_session(*, begun: bool = ..., is_async: Literal[True] = ..., pool_type: PoolType = ..., **connection_kwargs: Any) -> AsyncBegunSession | AsyncSession:
    ...


@overload
def get_session(*, begun: bool = ..., is_async: bool = ..., pool_type: PoolType = ..., **connection_kwargs: Any) -> BegunSession | AsyncBegunSession | Session | AsyncSession:
    ...


def get_session(*, begun: bool = True, is_async: bool = False, pool_type: PoolType = PoolType.QUEUE_POOL, **connection_kwargs: Any) -> BegunSession | AsyncBegunSession | Session | AsyncSession:
    engine = get_engine(is_async=is_async, pool_type=pool_type, **connection_kwargs)
    if begun:
        session_creator = AsyncBegunSession if is_async else BegunSession
    else:
        session_creator = AsyncSession if is_async else Session  # type: ignore[assignment]
    return session_creator(
        bind=engine,  # type: ignore[arg-type]
        expire_on_commit=False,
    )


@overload
def get_async_session(*, begun: Literal[True] = ..., pool_type: PoolType = ..., **connection_kwargs: Any) -> AsyncBegunSession:
    ...


@overload
def get_async_session(*, begun: Literal[False] = ..., pool_type: PoolType = ..., **connection_kwargs: Any) -> AsyncSession:
    ...


def get_async_session(*, begun: bool = True, pool_type: PoolType = PoolType.QUEUE_POOL, **connection_kwargs: Any) -> AsyncBegunSession | AsyncSession:
    return get_session(begun=begun, is_async=True, pool_type=pool_type, **connection_kwargs)
