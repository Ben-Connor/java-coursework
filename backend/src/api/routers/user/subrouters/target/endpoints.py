from fastapi import APIRouter, HTTPException, status
from sqlmodel import insert, select, and_
from sqlalchemy.exc import IntegrityError

from .schemas import PostTargetResponseSchema, PostTargetRequestSchema, GetTargetResponseSchema, GetTargetsResponseSchema
from .....lib.dependencies import SessionDep
from ......database.tables import NutrientTargetTable
from .....lib.consts import RouterTag


router = APIRouter(prefix="/{user_id}/target")
_router = APIRouter()


@_router.post("/", response_model=PostTargetResponseSchema)
def post_target(target_data: PostTargetRequestSchema, user_id: int, session: SessionDep) -> PostTargetResponseSchema:
    stmt = (
        insert(NutrientTargetTable)
        .values(
            name=target_data.name,
            quantity=target_data.quantity,
            unit=target_data.unit,
            is_lower_bound=target_data.is_lower_bound,
            user_id=user_id,
        )
        .returning(NutrientTargetTable)
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
    return PostTargetResponseSchema(target=target)


@_router.get("/all", response_model=GetTargetsResponseSchema)
def get_all_targets(user_id: int, session: SessionDep) -> GetTargetsResponseSchema:
    targets = session.scalars(
        select(NutrientTargetTable)
    )
    return GetTargetsResponseSchema(targets=list(targets))


@_router.get("/{target_id}", response_model=GetTargetResponseSchema)
def get_target(user_id: int, target_id: int, session: SessionDep) -> GetTargetResponseSchema:
    target = session.scalar(
        select(NutrientTargetTable)
        .where(
            and_(
                NutrientTargetTable.id == target_id,
                NutrientTargetTable.user_id == user_id,
            )
        )
    )
    if target is None:
        raise HTTPException(
            status.HTTP_404_NOT_FOUND,
            detail="No such target found."
        )
    return GetTargetResponseSchema(target=target)


router.include_router(_router, tags=[RouterTag.TARGET])
