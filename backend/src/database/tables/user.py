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

    calories: Optional["NutrientEntry"] = Relationship(back_populates="food_entry", sa_relationship_kwargs={"foreign_keys": "FoodEntry.calories_id"})
    protein: Optional["NutrientEntry"] = Relationship(back_populates="food_entry", sa_relationship_kwargs={"foreign_keys": "FoodEntry.protein_id"})
    carbohydrates: Optional["NutrientEntry"] = Relationship(back_populates="food_entry", sa_relationship_kwargs={"foreign_keys": "FoodEntry.carbohydrates_id"})
    fat: Optional["NutrientEntry"] = Relationship(back_populates="food_entry", sa_relationship_kwargs={"foreign_keys": "FoodEntry.fat_id"})
    sugar: Optional["NutrientEntry"] = Relationship(back_populates="food_entry", sa_relationship_kwargs={"foreign_keys": "FoodEntry.sugar_id"})

    vitamin_c: Optional["NutrientEntry"] = Relationship(back_populates="food_entry", sa_relationship_kwargs={"foreign_keys": "FoodEntry.vitamin_c_id"})
    vitamin_d: Optional["NutrientEntry"] = Relationship(back_populates="food_entry", sa_relationship_kwargs={"foreign_keys": "FoodEntry.vitamin_d_id"})
    fibre: Optional["NutrientEntry"] = Relationship(back_populates="food_entry", sa_relationship_kwargs={"foreign_keys": "FoodEntry.fibre_id"})


class NutrientEntry(NutrientEntryModel, DatabaseTable, table=True):
    __tablename__ = "nutrient_entries"

    food_entry: Optional["FoodEntry"] = Relationship(sa_relationship_kwargs={"foreign_keys": "NutrientEntry.food_entry_id"})
