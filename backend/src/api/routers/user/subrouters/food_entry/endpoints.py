from fastapi import APIRouter, HTTPException, status
from sqlmodel import insert, select, and_
from sqlalchemy.orm import joinedload, load_only

from .schemas import PostFoodEntryResponse, PostFoodEntryRequest, GetFoodEntryResponse, GetFoodEntriesResponse
from .....lib.dependencies import SessionDep
from ......database.tables import FoodEntryTable
from .utils import insert_nutrient_entry
from .....lib.consts import RouterTag


router = APIRouter(prefix="/{user_id}/entry")
_router = APIRouter()


@_router.post("/", response_model=PostFoodEntryResponse)
def post_food_entry(food_entry_data: PostFoodEntryRequest, user_id: int, session: SessionDep):
    calories = insert_nutrient_entry(session, food_entry_data.calories)
    protein = insert_nutrient_entry(session, food_entry_data.protein)
    carbohydrates = insert_nutrient_entry(session, food_entry_data.carbohydrates)
    fat = insert_nutrient_entry(session, food_entry_data.fat)
    sugar = insert_nutrient_entry(session, food_entry_data.sugar)
    vitamin_c = insert_nutrient_entry(session, food_entry_data.vitamin_c)
    vitamin_d = insert_nutrient_entry(session, food_entry_data.vitamin_d)
    fibre = insert_nutrient_entry(session, food_entry_data.fibre)
    food_entry = session.scalar(
        insert(FoodEntryTable)
        .values(
            name=food_entry_data.name,
            timestamp=food_entry_data.timestamp,
            user_id=user_id,
            calories_id=calories.id,
            protein_id=protein.id,
            carbohydrates_id=carbohydrates.id,
            fat_id=fat.id,
            sugar_id=sugar.id,
            vitamin_c_id=vitamin_c.id,
            vitamin_d_id=vitamin_d.id,
            fibre_id=fibre.id,
        )
        .returning(FoodEntryTable)
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
        .options(
            load_only(FoodEntryTable.id, FoodEntryTable.created_at, FoodEntryTable.updated_at, FoodEntryTable.name, FoodEntryTable.timestamp, FoodEntryTable.user_id),
            joinedload(FoodEntryTable.calories),
            joinedload(FoodEntryTable.protein),
            joinedload(FoodEntryTable.carbohydrates),
            joinedload(FoodEntryTable.fat),
            joinedload(FoodEntryTable.sugar),
            joinedload(FoodEntryTable.vitamin_c),
            joinedload(FoodEntryTable.vitamin_d),
            joinedload(FoodEntryTable.fibre),
        )
        .where(
            and_(
                FoodEntryTable.name == name,
                FoodEntryTable.user_id == user_id,
            )
        )
    )
    return GetFoodEntriesResponse(food_entries=list(food_entries))


@_router.get("/all", response_model=GetFoodEntriesResponse)
def get_all_food_entries(user_id: int, session: SessionDep):
    food_entries = session.scalars(
        select(FoodEntryTable)
        .options(
            load_only(FoodEntryTable.id, FoodEntryTable.created_at, FoodEntryTable.updated_at, FoodEntryTable.name, FoodEntryTable.timestamp, FoodEntryTable.user_id),
            joinedload(FoodEntryTable.calories),
            joinedload(FoodEntryTable.protein),
            joinedload(FoodEntryTable.carbohydrates),
            joinedload(FoodEntryTable.fat),
            joinedload(FoodEntryTable.sugar),
            joinedload(FoodEntryTable.vitamin_c),
            joinedload(FoodEntryTable.vitamin_d),
            joinedload(FoodEntryTable.fibre),
        )
        .where(FoodEntryTable.user_id == user_id)
    )
    return GetFoodEntriesResponse(food_entries=list(food_entries))


@_router.get("/{food_entry_id}", response_model=GetFoodEntryResponse)
def get_food_entry(user_id: int, food_entry_id: str, session: SessionDep):
    food_entry = session.scalar(
        select(FoodEntryTable)
        .options(
            load_only(FoodEntryTable.id, FoodEntryTable.created_at, FoodEntryTable.updated_at, FoodEntryTable.name, FoodEntryTable.timestamp, FoodEntryTable.user_id),
            joinedload(FoodEntryTable.calories),
            joinedload(FoodEntryTable.protein),
            joinedload(FoodEntryTable.carbohydrates),
            joinedload(FoodEntryTable.fat),
            joinedload(FoodEntryTable.sugar),
            joinedload(FoodEntryTable.vitamin_c),
            joinedload(FoodEntryTable.vitamin_d),
            joinedload(FoodEntryTable.fibre),
        )
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
