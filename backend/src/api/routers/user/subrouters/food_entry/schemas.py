from datetime import datetime

from .....lib.schemas import APISchema
from ......database.tables import FoodEntryTable
from ......lib.models.lib.consts import NutrientUnit


class Nutrient(APISchema):
    quantity: float
    unit: NutrientUnit


class NutrientEntry(Nutrient):
    id: int
    created_at: datetime
    updated_at: datetime


class FoodEntry(APISchema):
    id: int
    name: str
    timestamp: datetime
    user_id: int
    calories: NutrientEntry
    protein: NutrientEntry
    carbohydrates: NutrientEntry
    fat: NutrientEntry
    sugar: NutrientEntry
    vitamin_c: NutrientEntry
    vitamin_d: NutrientEntry
    fibre: NutrientEntry


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
    food_entry: FoodEntry


class GetFoodEntriesResponse(APISchema):
    food_entries: list[FoodEntry]
