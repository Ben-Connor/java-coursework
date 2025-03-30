from __future__ import annotations

from typing import Iterator, AsyncIterator, Annotated

from fastapi import Depends

from ...database import get_session, get_async_session, BegunSession, AsyncBegunSession


def get_session_dependency() -> Iterator[BegunSession]:
    with get_session() as session:
        yield session


SessionDep = Annotated[BegunSession, Depends(get_session_dependency)]


async def get_async_session_dependency() -> AsyncIterator[AsyncBegunSession]:
    async with get_async_session() as async_session:
        yield async_session


AsyncSessionDep = Annotated[AsyncBegunSession, Depends(get_async_session_dependency)]
