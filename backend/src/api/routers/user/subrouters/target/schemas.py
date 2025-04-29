from .....lib.schemas import APISchema
from ......lib.models import NutrientTargetModel
from ......lib.models.lib import DatabaseModel
from ......lib.models.lib.consts import NutrientUnit, Nutrient


class UserOutputSchema(NutrientTargetModel, DatabaseModel, APISchema):
    pass


class PostTargetRequestSchema(APISchema):
    name: Nutrient
    quantity: float
    unit: NutrientUnit
    is_lower_bound: bool


class PostTargetResponseSchema(APISchema):
    target: UserOutputSchema


class GetTargetResponseSchema(APISchema):
    target: UserOutputSchema


class GetTargetsResponseSchema(APISchema):
    targets: list[UserOutputSchema]
