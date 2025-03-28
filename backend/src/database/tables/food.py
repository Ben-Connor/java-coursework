from typing import TYPE_CHECKING

from sqlmodel import Relationship

from .lib import DatabaseTable
from ...lib.models import (
    FoodModel,
    MicronutrientModel,
    FoodMicronutrientModel,
    FoodSourceModel,
)

if TYPE_CHECKING:
    from .user import UserMacroLog, UserMicroLog


class Food(FoodModel, DatabaseTable, table=True):
    __tablename__ = "foods"

    macro_logs: list["UserMacroLog"] = Relationship(back_populates="food")
    micronutrients: list["FoodMicronutrient"] = Relationship(back_populates="food")
    sources: list["FoodSource"] = Relationship(back_populates="food")


class Micronutrient(MicronutrientModel, DatabaseTable, table=True):
    __tablename__ = "micronutrients"

    foods: list["FoodMicronutrient"] = Relationship(back_populates="micronutrient")
    micro_logs: list["UserMicroLog"] = Relationship(back_populates="micronutrient")


class FoodMicronutrient(FoodMicronutrientModel, DatabaseTable, table=True):
    __tablename__ = "food_micronutrients"

    food: "Food" = Relationship(back_populates="micronutrients")
    micronutrient: "Micronutrient" = Relationship(back_populates="foods")


class FoodSource(FoodSourceModel, DatabaseTable, table=True):
    __tablename__ = "food_sources"

    food: "Food" = Relationship(back_populates="sources")
