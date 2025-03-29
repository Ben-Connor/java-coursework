from contextlib import asynccontextmanager

from fastapi import FastAPI
from typing import AsyncIterator
from fastapi.middleware.cors import CORSMiddleware

from ..database.tables import drop_tables, create_tables
from ..database import get_engine
from .routers import meta_router, user_router
from .lib.consts import API_ORIGINS, API_PREFIX, ALL


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    drop_tables(get_engine())
    create_tables(get_engine())  # TODO: Alembic for production
    try:
        yield
    finally:
        pass


app = FastAPI(lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=API_ORIGINS,
    allow_credentials=True,
    allow_methods=[ALL],
    allow_headers=[ALL],
)
app.include_router(meta_router, prefix=API_PREFIX)
app.include_router(user_router, prefix=API_PREFIX)
