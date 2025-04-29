from datetime import datetime

from .....lib.schemas import APISchema
from ......lib.models.lib.consts import NutrientUnit, Nutrient
from ......lib.models import FoodEntryModel, NutrientEntryModel
from ......lib.models.lib import DatabaseModel


class NutrientEntryInputSchema(APISchema):
    name: Nutrient
    quantity: float
    unit: NutrientUnit


class NutrientEntryOutputSchema(NutrientEntryModel, DatabaseModel, APISchema):
    pass


class FoodEntryOutputSchema(FoodEntryModel, DatabaseModel, APISchema):
    nutrients: list[NutrientEntryOutputSchema]


class PostFoodEntryRequestSchema(APISchema):
    name: str
    timestamp: datetime
    nutrients: list[NutrientEntryInputSchema]


class PostFoodEntryResponseSchema(APISchema):
    food_entry: FoodEntryOutputSchema


class GetFoodEntryResponseSchema(APISchema):
    food_entry: FoodEntryOutputSchema


class GetFoodEntriesResponseSchema(APISchema):
    food_entries: list[FoodEntryOutputSchema]
