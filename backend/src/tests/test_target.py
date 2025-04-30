from fastapi.testclient import TestClient
from sqlmodel import select

from ..api.routers.user.subrouters.target.schemas import TargetOutputSchema
from ..database.tables import NutrientTargetTable
from ..database import BegunSession
from .lib import dump_database_model
from .lib.consts import USER_001, BULKING_NUTRIENT_TARGETS, BULKING_NUTRIENT_TARGET_001
from .lib.queries import insert_user, insert_nutrient_target, count_records


def test_create_targets(client: TestClient, session: BegunSession) -> None:
    insert_user(USER_001, session)
    targets_data = [item.model_dump(mode="json", exclude={"id"}) for item in BULKING_NUTRIENT_TARGETS]

    for idx, target_data in enumerate(targets_data):
        response = client.post(f"/api/v1/user/{USER_001.id}/target", json=target_data)
        assert response.status_code == 200

        target = TargetOutputSchema.model_validate(response.json()["target"])
        assert dump_database_model(session.scalar(select(NutrientTargetTable).where(NutrientTargetTable.id == BULKING_NUTRIENT_TARGETS[idx].id))) == target.model_dump()


def test_create_target_for_nonexistent_user(client: TestClient, session: BegunSession) -> None:
    target_data = BULKING_NUTRIENT_TARGET_001.model_dump(mode="json", exclude={"id"})

    response = client.post(f"/api/v1/user/{USER_001.id}/target", json=target_data)
    assert response.status_code == 404

    assert not count_records(NutrientTargetTable, session)


def test_get_target_by_id(client: TestClient, session: BegunSession) -> None:
    insert_user(USER_001, session)
    insert_nutrient_target(BULKING_NUTRIENT_TARGET_001, session)

    response = client.get(f"/api/v1/user/{USER_001.id}/target/{BULKING_NUTRIENT_TARGET_001.id}")
    assert response.status_code == 200

    target = TargetOutputSchema.model_validate(response.json()["target"])
    assert dump_database_model(session.scalar(select(NutrientTargetTable).where(NutrientTargetTable.id == BULKING_NUTRIENT_TARGET_001.id))) == target.model_dump()


def test_get_nonexistent_target_by_id(client: TestClient, session: BegunSession) -> None:
    response = client.get(f"/api/v1/user/{USER_001.id}/target/{BULKING_NUTRIENT_TARGET_001.id}")
    assert response.status_code == 404
    assert response.json()["detail"] == "No such target found."

    assert not count_records(NutrientTargetTable, session)


def test_get_all_targets(client: TestClient, session: BegunSession) -> None:
    response_001 = client.get(f"/api/v1/user/{USER_001.id}/target/all")
    assert response_001.status_code == 200
    assert response_001.json()["targets"] == []

    insert_user(USER_001, session)
    insert_nutrient_target(BULKING_NUTRIENT_TARGET_001, session)

    response_002 = client.get(f"/api/v1/user/{USER_001.id}/target/all")
    assert response_002.status_code == 200

    targets = [TargetOutputSchema.model_validate(item) for item in response_002.json()["targets"]]
    assert [target.model_dump() for target in session.scalars(select(NutrientTargetTable))] == [target.model_dump() for target in targets]
