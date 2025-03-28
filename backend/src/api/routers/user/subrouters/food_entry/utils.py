from sqlmodel import insert
from fastapi import HTTPException, status

from .schemas import Nutrient
from ......database.tables import NutrientEntryTable
from ......database import BegunSession


def insert_nutrient_entry(session: BegunSession, nutrient: Nutrient) -> NutrientEntryTable:
    nutrient_entry = session.scalar(
        insert(NutrientEntryTable)
        .values(
            quantity=nutrient.quantity,
            unit=nutrient.unit,
        )
        .returning(NutrientEntryTable)
    )
    if nutrient_entry is None:
        raise HTTPException(
            status.HTTP_400_BAD_REQUEST,
            detail=f"Failed to create nutrient entry: {nutrient}"
        )
    return nutrient_entry
