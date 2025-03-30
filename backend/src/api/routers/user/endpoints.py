from fastapi import APIRouter, HTTPException, status
from sqlmodel import insert, select
from sqlalchemy.exc import IntegrityError

from .schemas import PostUserResponse, PostUserRequest, GetUserResponse, GetUsersResponse
from ...lib.dependencies import SessionDep
from ....database.tables import UserTable
from .subrouters import food_entry_router
from ...lib.consts import RouterTag


router = APIRouter(prefix="/user")
_router = APIRouter()


@_router.post("/", response_model=PostUserResponse)
def post_user(user_data: PostUserRequest, session: SessionDep):
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
    return PostUserResponse(user=user)


@_router.get("/", response_model=GetUserResponse)
def get_user_by_email(email: str, session: SessionDep):
    user = session.scalar(
        select(UserTable)
        .where(UserTable.email == email)
    )
    if user is None:
        raise HTTPException(
            status.HTTP_404_NOT_FOUND,
            detail="No such user found."
        )
    return GetUserResponse(user=user)


@_router.get("/all", response_model=GetUsersResponse)
def get_all_users(session: SessionDep):
    users = session.scalars(
        select(UserTable)
    )
    return GetUsersResponse(users=list(users))


@_router.get("/{user_id}", response_model=GetUserResponse)
def get_user(user_id: int, session: SessionDep):
    user = session.scalar(
        select(UserTable)
        .where(UserTable.id == user_id)
    )
    if user is None:
        raise HTTPException(
            status.HTTP_404_NOT_FOUND,
            detail="No such user found."
        )
    return GetUserResponse(user=user)


router.include_router(_router, tags=[RouterTag.USER])
router.include_router(food_entry_router)
