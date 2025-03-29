from fastapi import APIRouter, HTTPException, status
from sqlmodel import insert, select, and_
from sqlalchemy.orm import joinedload
from sqlalchemy.exc import IntegrityError

from .schemas import PostFoodEntryResponse, PostFoodEntryRequest, GetFoodEntryResponse, GetFoodEntriesResponse
from .....lib.dependencies import SessionDep
from ......database.tables import FoodEntryTable, NutrientEntryTable
from .....lib.consts import RouterTag


router = APIRouter(prefix="/{user_id}/entry")
_router = APIRouter()


@_router.post("/", response_model=PostFoodEntryResponse)
def post_food_entry(food_entry_data: PostFoodEntryRequest, user_id: int, session: SessionDep):
    stmt = (
        insert(FoodEntryTable)
        .values(
            name=food_entry_data.name,
            timestamp=food_entry_data.timestamp,
            user_id=user_id,
        )
        .returning(FoodEntryTable)
    )
    try:
        food_entry = session.scalar(stmt)
    except IntegrityError:
        raise HTTPException(
            status.HTTP_400_BAD_REQUEST,
            detail="Cannot create food entry for non-existent user."
        )
    for nutrient in food_entry_data.nutrients:
        nutrient_entry = session.scalar(
            insert(NutrientEntryTable)
            .values(
                name=nutrient.name,
                quantity=nutrient.quantity,
                unit=nutrient.unit,
                food_entry_id=food_entry.id,
            )
            .returning(NutrientEntryTable)
        )
        if nutrient_entry is None:
            raise HTTPException(
                status.HTTP_400_BAD_REQUEST,
                detail=f"Failed to create nutrient entry: {nutrient}"
            )
    if food_entry is None:
        raise HTTPException(
            status.HTTP_400_BAD_REQUEST,
            detail=f"Failed to create food {food_entry_data.name!r}."
        )
    return PostFoodEntryResponse(food_entry=food_entry)


@_router.get("/", response_model=GetFoodEntriesResponse)
def get_food_entry_by_name(name: str, user_id: int, session: SessionDep):
    food_entries = session.scalars(
        select(FoodEntryTable)
        .options(joinedload(FoodEntryTable.nutrients))
        .where(
            and_(
                FoodEntryTable.name == name,
                FoodEntryTable.user_id == user_id,
            )
        )
    ).unique()
    return GetFoodEntriesResponse(food_entries=list(food_entries))


@_router.get("/all", response_model=GetFoodEntriesResponse)
def get_all_food_entries(user_id: int, session: SessionDep):
    food_entries = session.scalars(
        select(FoodEntryTable)
        .options(joinedload(FoodEntryTable.nutrients))
        .where(FoodEntryTable.user_id == user_id)
    ).unique()
    return GetFoodEntriesResponse(food_entries=list(food_entries))


@_router.get("/{food_entry_id}", response_model=GetFoodEntryResponse)
def get_food_entry(user_id: int, food_entry_id: str, session: SessionDep):
    food_entry = session.scalar(
        select(FoodEntryTable)
        .options(joinedload(FoodEntryTable.nutrients))
        .where(
            and_(
                FoodEntryTable.id == food_entry_id,
                FoodEntryTable.user_id == user_id,
            )
        )
    )
    if food_entry is None:
        raise HTTPException(
            status.HTTP_404_NOT_FOUND,
            detail="No such food found."
        )
    return GetFoodEntryResponse(food_entry=food_entry)


router.include_router(_router, tags=[RouterTag.FOOD_ENTRY])
