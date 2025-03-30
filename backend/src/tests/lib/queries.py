from sqlmodel import select, func, col, insert

from ...database.tables import UserTable, FoodEntryTable, NutrientEntryTable
from ...database import BegunSession
from ...lib.models import UserModel, FoodEntryModel, NutrientEntryModel
from ...database.tables.lib import DatabaseTable


def insert_user(user: UserModel, session: BegunSession) -> UserTable | None:
    return session.scalar(
        insert(UserTable)
        .values(
            username=user.username,
            email=user.email,
            password_hash=user.password_hash,
        )
        .returning(UserTable)
    )


def insert_food_entry(food_entry: FoodEntryModel, session: BegunSession) -> FoodEntryTable | None:
    return session.scalar(
        insert(FoodEntryTable)
        .values(
            name=food_entry.name,
            timestamp=food_entry.timestamp,
            user_id=food_entry.user_id,
        )
        .returning(FoodEntryTable)
    )


def insert_nutrient_entry(nutrient_entry: NutrientEntryModel, session: BegunSession) -> NutrientEntryTable | None:
    return session.scalar(
        insert(NutrientEntryTable)
        .values(
            name=nutrient_entry.name,
            quantity=nutrient_entry.quantity,
            unit=nutrient_entry.unit,
            food_entry_id=nutrient_entry.food_entry_id,
        )
        .returning(NutrientEntryTable)
    )


def count_records(table: type[DatabaseTable], session: BegunSession) -> int | None:
    return session.scalar(select(func.count(col(table.id))))
