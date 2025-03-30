from __future__ import annotations

from datetime import datetime

from sqlmodel import Field

from .lib import DataModel
from ..utils import now
from .lib.consts import NutrientUnit, Nutrient


class User(DataModel):
    username: str = Field(index=True)
    email: str = Field(unique=True, index=True)
    password_hash: str = Field()


class FoodEntry(DataModel):
    name: str = Field()
    timestamp: datetime = Field(default_factory=now)

    user_id: int = Field(foreign_key="users.id", index=True)


class NutrientEntry(DataModel):
    name: Nutrient = Field()
    quantity: float = Field()
    unit: NutrientUnit = Field()

    food_entry_id: int = Field(foreign_key="food_entries.id", index=True)
