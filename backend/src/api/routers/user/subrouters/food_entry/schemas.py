from datetime import datetime

from .....lib.schemas import APISchema
from ......database.tables import FoodEntryTable, NutrientEntryTable
from ......lib.models.lib.consts import NutrientUnit, Nutrient
from ......lib.models import FoodEntryModel
from ......database.tables.lib import DatabaseTable


class NutrientEntryInputSchema(APISchema):
    name: Nutrient
    quantity: float
    unit: NutrientUnit


class FoodEntrySchema(FoodEntryModel, DatabaseTable, APISchema):
    nutrients: list[NutrientEntryTable]


class PostFoodEntryRequest(APISchema):
    name: str
    timestamp: datetime
    nutrients: list[NutrientEntryInputSchema]


class PostFoodEntryResponse(APISchema):
    food_entry: FoodEntryTable


class GetFoodEntryResponse(APISchema):
    food_entry: FoodEntrySchema


class GetFoodEntriesResponse(APISchema):
    food_entries: list[FoodEntrySchema]
