from contextlib import asynccontextmanager

from fastapi import FastAPI
from typing import AsyncIterator
from fastapi.middleware.cors import CORSMiddleware

from .routers import meta_router
from .lib.consts import API_ORIGINS, API_PREFIX, RouterTag, ALL


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
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
    allow_headers=[ALL]
)
app.include_router(meta_router, prefix=API_PREFIX, tags=[RouterTag.META])
