from datetime import datetime

from .....lib.schemas import APISchema
from ......database.tables import FoodEntryTable
from ......lib.models.lib.consts import NutrientUnit, Nutrient
from ......lib.models import FoodEntryModel

class NutrientEntry(APISchema):
    name: Nutrient
    quantity: float
    unit: NutrientUnit


class FoodEntry(FoodEntryModel, APISchema):
    nutrients: list[NutrientEntry]


class PostFoodEntryRequest(APISchema):
    name: str
    timestamp: datetime
    nutrients: list[NutrientEntry]


class PostFoodEntryResponse(APISchema):
    food_entry: FoodEntryTable


class GetFoodEntryResponse(APISchema):
    food_entry: FoodEntry


class GetFoodEntriesResponse(APISchema):
    food_entries: list[FoodEntry]
