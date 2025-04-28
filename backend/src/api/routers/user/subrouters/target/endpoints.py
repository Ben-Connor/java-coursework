from fastapi import APIRouter, HTTPException, status
from sqlmodel import insert, select, and_
from sqlalchemy.orm import joinedload
from sqlalchemy.exc import IntegrityError

from .schemas import PostTargetResponse, PostTargetRequest, GetTargetResponse, GetFoodTargetsResponse
from .....lib.dependencies import SessionDep
from ......database.tables import TargetTable, NutrientTargetTable
from .....lib.consts import RouterTag


router = APIRouter(prefix="/{user_id}/target")
_router = APIRouter()


@_router.post("/", response_model=PostTargetResponse)
def post_target(target_data: PostTargetRequest, user_id: int, session: SessionDep) -> PostTargetResponse:
    stmt = (
        insert(TargetTable)
        .values(
            timestamp=target_data.timestamp,
            user_id=user_id,
        )
        .returning(TargetTable)
    )
    try:
        target = session.scalar(stmt)
    except IntegrityError:
        raise HTTPException(
            status.HTTP_404_NOT_FOUND,
            detail="Cannot create target for non-existent user."
        )
    if target is None:
        raise HTTPException(
            status.HTTP_400_BAD_REQUEST,
            detail="Failed to create target."
        )
    for nutrient in target_data.nutrients:
        nutrient_target = session.scalar(
            insert(NutrientTargetTable)
            .values(
                name=nutrient.name,
                quantity=nutrient.quantity,
                unit=nutrient.unit,
                target_id=target.id,
            )
            .returning(NutrientTargetTable)
        )
        if nutrient_target is None:
            raise HTTPException(
                status.HTTP_400_BAD_REQUEST,
                detail=f"Failed to create nutrient target: {nutrient.name!r}."
            )
    return PostTargetResponse(target=target)


@_router.get("/all", response_model=GetFoodTargetsResponse)
def get_all_targets(user_id: int, session: SessionDep) -> GetFoodTargetsResponse:
    targets = session.scalars(
        select(TargetTable)
        .options(joinedload(TargetTable.nutrients))  # type: ignore[arg-type]
        .where(TargetTable.user_id == user_id)
    ).unique()
    return GetFoodTargetsResponse(targets=list(targets))


@_router.get("/{target_id}", response_model=GetTargetResponse)
def get_target(user_id: int, target_id: int, session: SessionDep) -> GetTargetResponse:
    target = session.scalar(
        select(TargetTable)
        .options(joinedload(TargetTable.nutrients))  # type: ignore[arg-type]
        .where(
            and_(
                TargetTable.id == target_id,
                TargetTable.user_id == user_id,
            )
        )
    )
    if target is None:
        raise HTTPException(
            status.HTTP_404_NOT_FOUND,
            detail="No such target found."
        )
    return GetTargetResponse(target=target)


router.include_router(_router, tags=[RouterTag.TARGET])
