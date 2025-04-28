from sqlmodel import Relationship

from .lib import DatabaseTable
from ...lib.models import (
    UserModel,
    FoodEntryModel,
    NutrientEntryModel,
    TargetModel,
    NutrientTargetModel,
)


class User(UserModel, DatabaseTable, table=True):
    __tablename__ = "users"

    food_entries: list["FoodEntry"] = Relationship(back_populates="user")
    targets: list["Target"] = Relationship(back_populates="user")


class FoodEntry(FoodEntryModel, DatabaseTable, table=True):
    __tablename__ = "food_entries"

    user: "User" = Relationship(back_populates="food_entries")
    nutrients: list["NutrientEntry"] = Relationship(back_populates="food_entry")


class NutrientEntry(NutrientEntryModel, DatabaseTable, table=True):
    __tablename__ = "nutrient_entries"

    food_entry: "FoodEntry" = Relationship(back_populates="nutrients")


class Target(TargetModel, DatabaseTable, table=True):
    __tablename__ = "targets"

    user: "User" = Relationship(back_populates="targets")
    nutrients: list["NutrientTarget"] = Relationship(back_populates="target")


class NutrientTarget(NutrientTargetModel, DatabaseTable, table=True):
    __tablename__ = "nutrient_targets"

    target: "Target" = Relationship(back_populates="nutrients")
