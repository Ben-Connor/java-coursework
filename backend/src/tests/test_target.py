from fastapi.testclient import TestClient
from sqlmodel import select

from ..database.tables import TargetTable, NutrientTargetTable
from ..database import BegunSession
from .lib.consts import USER_001, BULKING_TARGET, BULKING_NUTRIENT_TARGETS
from .lib.queries import insert_user, insert_target, insert_nutrient_target, count_records
from ..api.routers.user.subrouters.target.schemas import TargetSchema


def test_create_target(client: TestClient, session: BegunSession) -> None:
    insert_user(USER_001, session)
    target_data = {
        **BULKING_TARGET.model_dump(mode="json", exclude={"id"}),
        "nutrients": [nutrient_target.model_dump(mode="json", exclude={"id"}) for nutrient_target in BULKING_NUTRIENT_TARGETS]
    }

    response = client.post(f"/api/v1/user/{USER_001.id}/target", json=target_data)
    assert response.status_code == 200

    target = TargetTable.model_validate(response.json()["target"])
    assert session.scalar(select(TargetTable).where(TargetTable.id == BULKING_TARGET.id)) == target


def test_create_target_for_nonexistent_user(client: TestClient, session: BegunSession) -> None:
    target_data = {
        **BULKING_TARGET.model_dump(mode="json", exclude={"id"}),
        "nutrients": [nutrient_target.model_dump(mode="json", exclude={"id"}) for nutrient_target in BULKING_NUTRIENT_TARGETS]
    }

    response = client.post(f"/api/v1/user/{USER_001.id}/target", json=target_data)
    assert response.status_code == 404

    assert not count_records(TargetTable, session)


def test_get_target_by_id(client: TestClient, session: BegunSession) -> None:
    insert_user(USER_001, session)
    insert_target(BULKING_TARGET, session)
    for nutrient_target in BULKING_NUTRIENT_TARGETS:
        insert_nutrient_target(nutrient_target, session)

    response = client.get(f"/api/v1/user/{USER_001.id}/target/{BULKING_TARGET.id}")
    assert response.status_code == 200

    target = TargetSchema.model_validate(response.json()["target"])
    assert session.scalar(select(TargetTable).where(TargetTable.id == BULKING_TARGET.id)) == TargetTable.model_validate(target)
    assert list(session.scalars(select(NutrientTargetTable).join(TargetTable).where(TargetTable.id == BULKING_TARGET.id))) == [NutrientTargetTable.model_validate(nutrient_target) for nutrient_target in target.nutrients]


def test_get_nonexistent_target_by_id(client: TestClient, session: BegunSession) -> None:
    response = client.get(f"/api/v1/user/{USER_001.id}/target/{BULKING_TARGET.id}")
    assert response.status_code == 404

    assert not count_records(TargetTable, session)


def test_get_all_targets(client: TestClient, session: BegunSession) -> None:
    response_001 = client.get(f"/api/v1/user/{USER_001.id}/target/all")
    assert response_001.status_code == 200
    assert response_001.json()["targets"] == []

    insert_user(USER_001, session)
    insert_target(BULKING_TARGET, session)
    for nutrient_target in BULKING_NUTRIENT_TARGETS:
        insert_nutrient_target(nutrient_target, session)

    response_002 = client.get(f"/api/v1/user/{USER_001.id}/target/all")
    assert response_002.status_code == 200

    targets = [TargetSchema.model_validate(item) for item in response_002.json()["targets"]]
    assert list(session.scalars(select(TargetTable))) == [TargetTable.model_validate(target) for target in targets]
    assert list(session.scalars(select(NutrientTargetTable))) == [NutrientTargetTable.model_validate(nutrient_target) for nutrient_target in targets[0].nutrients]
