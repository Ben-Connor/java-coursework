from ...lib.schemas import APISchema
from ....database.tables import UserTable


class PostUserRequest(APISchema):
    username: str
    email: str
    password_hash: str


class PostUserResponse(APISchema):
    user: UserTable


class GetUserResponse(APISchema):
    user: UserTable


class GetUsersResponse(APISchema):
    users: list[UserTable]
