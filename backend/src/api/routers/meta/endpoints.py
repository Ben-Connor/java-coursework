from fastapi import APIRouter

from .schemas import GetIsHealthyResponse


router = APIRouter()


@router.get("/health", response_model=GetIsHealthyResponse)
def get_is_healthy():
    return GetIsHealthyResponse(is_healthy=True)
