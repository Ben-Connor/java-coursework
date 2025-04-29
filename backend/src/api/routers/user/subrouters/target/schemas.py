from .....lib.schemas import APISchema
from ......database.tables import NutrientTargetTable
from ......lib.models.lib.consts import NutrientUnit, Nutrient


class PostTargetRequest(APISchema):
    name: Nutrient
    quantity: float
    unit: NutrientUnit
    is_lower_bound: bool


class PostTargetResponse(APISchema):
    target: NutrientTargetTable


class GetTargetResponse(APISchema):
    target: NutrientTargetTable


class GetTargetsResponse(APISchema):
    targets: list[NutrientTargetTable]
