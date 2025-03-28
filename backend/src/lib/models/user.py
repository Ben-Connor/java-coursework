from __future__ import annotations

from datetime import datetime
from typing import Optional

from sqlmodel import Field

from .lib import DataModel
from ..utils import now
from .lib.consts import NutrientUnit


class User(DataModel):
    username: str = Field(index=True)
    email: str = Field(unique=True, index=True)
    password_hash: str = Field()


class FoodEntry(DataModel):
    name: str = Field()
    timestamp: datetime = Field(default_factory=now)

    user_id: int = Field(foreign_key="users.id", index=True)

    calories_id: Optional[int] = Field(foreign_key="nutrient_entries.id", index=True)
    protein_id: Optional[int] = Field(foreign_key="nutrient_entries.id", index=True)
    carbohydrates_id: Optional[int] = Field(foreign_key="nutrient_entries.id", index=True)
    fat_id: Optional[int] = Field(foreign_key="nutrient_entries.id", index=True)
    sugar_id: Optional[int] = Field(foreign_key="nutrient_entries.id", index=True)

    vitamin_c_id: Optional[int] = Field(foreign_key="nutrient_entries.id", index=True)
    vitamin_d_id: Optional[int] = Field(foreign_key="nutrient_entries.id", index=True)
    fibre_id: Optional[int] = Field(foreign_key="nutrient_entries.id", index=True)


class NutrientEntry(DataModel):
    quantity: float = Field()
    unit: NutrientUnit = Field()

    food_entry_id: Optional[int] = Field(foreign_key="food_entries.id", index=True)
