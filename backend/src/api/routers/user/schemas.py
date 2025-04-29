from ...lib.schemas import APISchema
from ....lib.models.lib import DatabaseModel
from ....lib.models import UserModel


class UserOutputSchema(UserModel, DatabaseModel, APISchema):
    pass


class PostUserRequestSchema(APISchema):
    username: str
    email: str
    password_hash: str


class PostUserResponseSchema(APISchema):
    user: UserOutputSchema


class GetUserResponseSchema(APISchema):
    user: UserOutputSchema


class GetUsersResponseSchema(APISchema):
    users: list[UserOutputSchema]
