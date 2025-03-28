from __future__ import annotations

from sqlmodel import Field

from .lib import DataModel


class Food(DataModel):
    name: str = Field(unique=True)
    calories: float = Field()
    protein: float = Field()
    carbs: float = Field()
    fat: float = Field()


class Micronutrient(DataModel):
    name: str = Field(unique=True)
    unit: str = Field()


class FoodMicronutrient(DataModel):
    amount: float = Field()

    food_id: int = Field(foreign_key="foods.id", index=True)
    micronutrient_id: int = Field(foreign_key="micronutrients.id", index=True)


class FoodSource(DataModel):
    source_name: str = Field()
    external_id: str = Field()

    food_id: int = Field(foreign_key="foods.id", index=True)
