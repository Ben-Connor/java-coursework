from typing import Optional

from sqlmodel import Relationship

from .lib import DatabaseTable
from ...lib.models import (
    UserModel,
    FoodEntryModel,
    NutrientEntryModel,
)


class User(UserModel, DatabaseTable, table=True):
    __tablename__ = "users"

    food_entries: list["FoodEntry"] = Relationship(back_populates="user")


class FoodEntry(FoodEntryModel, DatabaseTable, table=True):
    __tablename__ = "food_entries"

    user: "User" = Relationship(back_populates="food_entries")
    nutrients: list["NutrientEntry"] = Relationship(back_populates="food_entry")


class NutrientEntry(NutrientEntryModel, DatabaseTable, table=True):
    __tablename__ = "nutrient_entries"

    food_entry: "FoodEntry" = Relationship(back_populates="nutrients")
