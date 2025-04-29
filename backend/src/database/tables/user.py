from sqlmodel import Relationship

from ...lib.models.lib import DatabaseModel
from ...lib.models import (
    UserModel,
    FoodEntryModel,
    NutrientEntryModel,
    NutrientTargetModel,
)


class User(UserModel, DatabaseModel, table=True):
    __tablename__ = "users"

    food_entries: list["FoodEntry"] = Relationship(back_populates="user")
    targets: list["NutrientTarget"] = Relationship(back_populates="user")


class FoodEntry(FoodEntryModel, DatabaseModel, table=True):
    __tablename__ = "food_entries"

    user: "User" = Relationship(back_populates="food_entries")
    nutrients: list["NutrientEntry"] = Relationship(back_populates="food_entry")


class NutrientEntry(NutrientEntryModel, DatabaseModel, table=True):
    __tablename__ = "nutrient_entries"

    food_entry: "FoodEntry" = Relationship(back_populates="nutrients")


class NutrientTarget(NutrientTargetModel, DatabaseModel, table=True):
    __tablename__ = "nutrient_targets"

    user: "User" = Relationship(back_populates="targets")
