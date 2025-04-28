from datetime import datetime

from .....lib.schemas import APISchema
from ......database.tables import TargetTable, NutrientTargetTable
from ......lib.models.lib.consts import NutrientUnit, Nutrient
from ......lib.models import TargetModel
from ......database.tables.lib import DatabaseTable


class NutrientTargetInputSchema(APISchema):
    name: Nutrient
    quantity: float
    unit: NutrientUnit


class TargetSchema(TargetModel, DatabaseTable, APISchema):
    nutrients: list[NutrientTargetTable]


class PostTargetRequest(APISchema):
    timestamp: datetime
    nutrients: list[NutrientTargetInputSchema]


class PostTargetResponse(APISchema):
    target: TargetTable


class GetTargetResponse(APISchema):
    target: TargetSchema


class GetFoodTargetsResponse(APISchema):
    targets: list[TargetSchema]
