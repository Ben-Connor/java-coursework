from fastapi import APIRouter

from .schemas import GetIsHealthyResponse
from ...lib.consts import RouterTag


router = APIRouter()
_router = APIRouter()


@_router.get("/health", response_model=GetIsHealthyResponse)
def get_is_healthy():
    return GetIsHealthyResponse(is_healthy=True)


router.include_router(_router, tags=[RouterTag.META])
