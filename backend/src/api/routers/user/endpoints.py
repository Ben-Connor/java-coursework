from fastapi import APIRouter, HTTPException, status
from sqlmodel import insert, select
from sqlalchemy.exc import IntegrityError

from .schemas import PostUserResponseSchema, PostUserRequestSchema, GetUserResponseSchema, GetUsersResponseSchema
from ...lib.dependencies import SessionDep
from ....database.tables import UserTable
from .subrouters import food_entry_router, target_router
from ...lib.consts import RouterTag


router = APIRouter(prefix="/user")
_router = APIRouter()


@_router.post("/", response_model=PostUserResponseSchema)
def post_user(user_data: PostUserRequestSchema, session: SessionDep) -> PostUserResponseSchema:
    stmt = (
        insert(UserTable)
        .values(
            username=user_data.username,
            email=user_data.email,
            password_hash=user_data.password_hash,
        )
        .returning(UserTable)
    )
    try:
        user = session.scalar(stmt)
    except IntegrityError:
        raise HTTPException(
            status.HTTP_400_BAD_REQUEST,
            detail="Cannot create duplicate user."
        )
    if user is None:
        raise HTTPException(
            status.HTTP_400_BAD_REQUEST,
            detail="Failed to create user."
        )
    return PostUserResponseSchema(user=user)


@_router.get("/", response_model=GetUserResponseSchema)
def get_user_by_email(email: str, session: SessionDep) -> GetUserResponseSchema:
    user = session.scalar(
        select(UserTable)
        .where(UserTable.email == email)
    )
    if user is None:
        raise HTTPException(
            status.HTTP_404_NOT_FOUND,
            detail="No such user found."
        )
    return GetUserResponseSchema(user=user)


@_router.get("/all", response_model=GetUsersResponseSchema)
def get_all_users(session: SessionDep) -> GetUsersResponseSchema:
    users = session.scalars(
        select(UserTable)
    )
    return GetUsersResponseSchema(users=list(users))


@_router.get("/{user_id}", response_model=GetUserResponseSchema)
def get_user(user_id: int, session: SessionDep) -> GetUserResponseSchema:
    user = session.scalar(
        select(UserTable)
        .where(UserTable.id == user_id)
    )
    if user is None:
        raise HTTPException(
            status.HTTP_404_NOT_FOUND,
            detail="No such user found."
        )
    return GetUserResponseSchema(user=user)


router.include_router(_router, tags=[RouterTag.USER])
router.include_router(food_entry_router)
router.include_router(target_router)
