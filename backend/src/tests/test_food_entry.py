from fastapi.testclient import TestClient
from sqlmodel import select

from ..database.tables import FoodEntryTable, NutrientEntryTable
from ..database import BegunSession
from .lib import without
from .lib.consts import USER_001, CHICKEN_ENTRY, CHICKEN_NUTRIENT_ENTRIES
from .lib.queries import insert_user, insert_food_entry, insert_nutrient_entry, count_records
from ..api.routers.user.subrouters.food_entry.schemas import FoodEntryOutputSchema


def test_create_food_entry(client: TestClient, session: BegunSession) -> None:
    insert_user(USER_001, session)
    food_entry_data = {
        **CHICKEN_ENTRY.model_dump(mode="json", exclude={"id"}),
        "nutrients": [nutrient_entry.model_dump(mode="json", exclude={"id"}) for nutrient_entry in CHICKEN_NUTRIENT_ENTRIES]
    }

    response = client.post(f"/api/v1/user/{USER_001.id}/entry", json=food_entry_data)
    assert response.status_code == 200

    food_entry = FoodEntryOutputSchema.model_validate(response.json()["foodEntry"])
    assert session.scalar(select(FoodEntryTable).where(FoodEntryTable.id == CHICKEN_ENTRY.id)).model_dump() == without(food_entry.model_dump(), "nutrients")


def test_create_food_entry_for_nonexistent_user(client: TestClient, session: BegunSession) -> None:
    food_entry_data = {
        **CHICKEN_ENTRY.model_dump(mode="json", exclude={"id"}),
        "nutrients": [nutrient_entry.model_dump(mode="json", exclude={"id"}) for nutrient_entry in CHICKEN_NUTRIENT_ENTRIES]
    }

    response = client.post(f"/api/v1/user/{USER_001.id}/entry", json=food_entry_data)
    assert response.status_code == 404

    assert not count_records(FoodEntryTable, session)


def test_get_food_entries_by_name(client: TestClient, session: BegunSession) -> None:
    insert_user(USER_001, session)
    insert_food_entry(CHICKEN_ENTRY, session)
    for nutrient_entry in CHICKEN_NUTRIENT_ENTRIES:
        insert_nutrient_entry(nutrient_entry, session)

    response = client.get(f"/api/v1/user/{USER_001.id}/entry?name={CHICKEN_ENTRY.name}")
    assert response.status_code == 200

    food_entries = [FoodEntryOutputSchema.model_validate(item) for item in response.json()["foodEntries"]]
    assert (
        [food_entry.model_dump() for food_entry in session.scalars(select(FoodEntryTable).where(FoodEntryTable.name == CHICKEN_ENTRY.name))]
        == [without(food_entry.model_dump(), "nutrients") for food_entry in food_entries]
    )
    assert ([
        nutrient_entry.model_dump() for nutrient_entry in session.scalars(select(NutrientEntryTable).join(FoodEntryTable).where(FoodEntryTable.name == CHICKEN_ENTRY.name))]
        == [nutrient_entry.model_dump() for nutrient_entry in food_entries[0].nutrients]
    )


def test_get_nonexistent_food_entries_by_name(client: TestClient, session: BegunSession) -> None:
    response = client.get(f"/api/v1/user/{USER_001.id}/entry?name={CHICKEN_ENTRY.name}")
    assert response.status_code == 200
    assert response.json()["foodEntries"] == []

    assert not count_records(FoodEntryTable, session)


def test_get_food_entry_by_id(client: TestClient, session: BegunSession) -> None:
    insert_user(USER_001, session)
    insert_food_entry(CHICKEN_ENTRY, session)
    for nutrient_entry in CHICKEN_NUTRIENT_ENTRIES:
        insert_nutrient_entry(nutrient_entry, session)

    response = client.get(f"/api/v1/user/{USER_001.id}/entry/{CHICKEN_ENTRY.id}")
    assert response.status_code == 200

    food_entry = FoodEntryOutputSchema.model_validate(response.json()["foodEntry"])
    assert session.scalar(select(FoodEntryTable).where(FoodEntryTable.id == CHICKEN_ENTRY.id)).model_dump() == without(food_entry.model_dump(), "nutrients")
    assert (
        [nutrient_entry.model_dump() for nutrient_entry in session.scalars(select(NutrientEntryTable).join(FoodEntryTable).where(FoodEntryTable.id == CHICKEN_ENTRY.id))]
        == [nutrient_entry.model_dump() for nutrient_entry in food_entry.nutrients]
    )


def test_get_nonexistent_food_entry_by_id(client: TestClient, session: BegunSession) -> None:
    response = client.get(f"/api/v1/user/{USER_001.id}/entry/{CHICKEN_ENTRY.id}")
    assert response.status_code == 404

    assert not count_records(FoodEntryTable, session)


def test_get_all_food_entries(client: TestClient, session: BegunSession) -> None:
    response_001 = client.get(f"/api/v1/user/{USER_001.id}/entry/all")
    assert response_001.status_code == 200
    assert response_001.json()["foodEntries"] == []

    insert_user(USER_001, session)
    insert_food_entry(CHICKEN_ENTRY, session)
    for nutrient_entry in CHICKEN_NUTRIENT_ENTRIES:
        insert_nutrient_entry(nutrient_entry, session)

    response_002 = client.get(f"/api/v1/user/{USER_001.id}/entry/all")
    assert response_002.status_code == 200

    food_entries = [FoodEntryOutputSchema.model_validate(item) for item in response_002.json()["foodEntries"]]
    assert (
        [food_entry.model_dump() for food_entry in session.scalars(select(FoodEntryTable).where(FoodEntryTable.name == CHICKEN_ENTRY.name))]
        == [without(food_entry.model_dump(), "nutrients") for food_entry in food_entries]
    )
    assert ([
        nutrient_entry.model_dump() for nutrient_entry in session.scalars(select(NutrientEntryTable).join(FoodEntryTable).where(FoodEntryTable.name == CHICKEN_ENTRY.name))]
        == [nutrient_entry.model_dump() for nutrient_entry in food_entries[0].nutrients]
    )
