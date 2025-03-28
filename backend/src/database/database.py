from typing import overload, Literal

from sqlalchemy import Engine, create_engine
from sqlmodel import Session
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlalchemy.ext.asyncio import create_async_engine, AsyncEngine

from .begun_session import BegunSession, AsyncBegunSession
from .lib.schemas import EngineSettings
from .lib.consts import PoolType
from ..configuration import CONFIGURATION


_ENGINES: dict[EngineSettings, Engine | AsyncEngine] = {}


@overload
def get_engine(*, is_async: Literal[False] = ..., pool_type: PoolType = ...) -> Engine:
    ...


@overload
def get_engine(*, is_async: Literal[True] = ..., pool_type: PoolType = ...) -> AsyncEngine:
    ...


def get_engine(*, is_async: bool = False, pool_type: PoolType = PoolType.QUEUE_POOL) -> Engine | AsyncEngine:
    engine_settings = EngineSettings(is_async, pool_type)
    cached_engine = _ENGINES.get(engine_settings)
    if cached_engine is not None:
        return cached_engine
    engine_creator = create_async_engine if is_async else create_engine
    engine = engine_creator(
        CONFIGURATION.DATABASE_URL,
        echo=CONFIGURATION.is_development(),
        poolclass=pool_type.to_pool_class()
    )
    _ENGINES[engine_settings] = engine
    return engine


@overload
def get_session(*, begun: Literal[True] = ..., is_async: Literal[False] = ..., pool_type: PoolType = ...) -> BegunSession:
    ...


@overload
def get_session(*, begun: Literal[True] = ..., is_async: Literal[True] = ..., pool_type: PoolType = ...) -> AsyncBegunSession:
    ...


@overload
def get_session(*, begun: Literal[False] = ..., is_async: Literal[False] = ..., pool_type: PoolType = ...) -> Session:
    ...


@overload
def get_session(*, begun: Literal[False] = ..., is_async: Literal[True] = ..., pool_type: PoolType = ...) -> AsyncSession:
    ...


def get_session(*, begun: bool = True, is_async: bool = False, pool_type: PoolType = PoolType.QUEUE_POOL) -> BegunSession | AsyncBegunSession | Session | AsyncSession:
    engine = get_engine(is_async=is_async, pool_type=pool_type)
    if begun:
        session_creator = AsyncBegunSession if is_async else BegunSession
    else:
        session_creator = AsyncSession if is_async else Session
    return session_creator(
        bind=engine,
        expire_on_commit=False,
    )


@overload
def get_async_session(*, begun: Literal[True] = ..., pool_type: PoolType = ...) -> AsyncBegunSession:
    ...


@overload
def get_async_session(*, begun: Literal[False] = ..., pool_type: PoolType = ...) -> AsyncSession:
    ...


def get_async_session(*, begun: bool = True, pool_type: PoolType = PoolType.QUEUE_POOL) -> AsyncBegunSession | AsyncSession:
    return get_session(begun=begun, is_async=True, pool_type=pool_type)
