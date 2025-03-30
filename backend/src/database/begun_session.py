from typing import Self, Any
from dataclasses import dataclass

from sqlalchemy import Engine
from sqlalchemy.orm import SessionTransaction
from sqlmodel import Session
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlalchemy.ext.asyncio import AsyncEngine, AsyncSessionTransaction


@dataclass(slots=True, init=False)
class BegunSession(Session):
    transaction: SessionTransaction

    def __init__(self, bind: Engine, **kwargs: Any) -> None:
        super(BegunSession, self).__init__(bind=bind, **kwargs)
        self.transaction = self.begin()
    
    def __enter__(self) -> Self:
        super(BegunSession, self).__enter__()
        self.transaction.__enter__()
        return self
    
    def __exit__(self, type_: Any, value: Any, traceback: Any) -> None:
        self.transaction.__exit__(type_, value, traceback)
        super(BegunSession, self).__exit__(type_, value, traceback)


@dataclass(slots=True, init=False)
class AsyncBegunSession(AsyncSession):
    transaction: AsyncSessionTransaction

    def __init__(self, bind: AsyncEngine, **kwargs: Any) -> None:
        super(AsyncBegunSession, self).__init__(bind=bind, **kwargs)
        self.transaction = self.begin()
    
    async def __aenter__(self) -> Self:
        await super(AsyncBegunSession, self).__aenter__()
        await self.transaction.__aenter__()
        return self
    
    async def __aexit__(self, type_: Any, value: Any, traceback: Any) -> None:
        await self.transaction.__aexit__(type_, value, traceback)
        await super(AsyncBegunSession, self).__aexit__(type_, value, traceback)
