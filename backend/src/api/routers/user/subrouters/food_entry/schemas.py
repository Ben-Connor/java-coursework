from datetime import datetime

from .....lib.schemas import APISchema
from ......database.tables import FoodEntryTable
from ......lib.models.lib.consts import NutrientUnit


class Nutrient(APISchema):
    quantity: float
    unit: NutrientUnit


class PostFoodEntryRequest(APISchema):
    name: str
    timestamp: datetime
    calories: Nutrient
    protein: Nutrient
    carbohydrates: Nutrient
    fat: Nutrient
    sugar: Nutrient
    vitamin_c: Nutrient
    vitamin_d: Nutrient
    fibre: Nutrient


class PostFoodEntryResponse(APISchema):
    food_entry: FoodEntryTable


class GetFoodEntryResponse(APISchema):
    food_entry: FoodEntryTable


class GetFoodEntriesResponse(APISchema):
    food_entries: list[FoodEntryTable]
