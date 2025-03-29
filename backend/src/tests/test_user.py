from fastapi.testclient import TestClient
from sqlmodel import select, insert, func, col

from ..database.tables import UserTable
from ..database import BegunSession
from ..lib.models import UserModel


USER_001 = UserModel(
    id=1,
    username="test_username",
    email="test_username@email.com",
    password_hash="hashed_password",
)


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


def test_create_user(client: TestClient, session: BegunSession) -> None:
    user_data = USER_001.model_dump(mode="json", exclude="id")

    response = client.post("/api/v1/user", json=user_data)
    assert response.status_code == 200

    user = UserTable.model_validate(response.json()["user"])
    assert session.scalar(select(UserTable).where(UserTable.id == USER_001.id)) == user


def test_create_duplicate_user(client: TestClient, session: BegunSession) -> None:
    insert_user(USER_001, session)
    user_data = USER_001.model_dump(mode="json", exclude="id")

    response = client.post("/api/v1/user", json=user_data)
    assert response.status_code == 400
    assert response.json()["detail"] == "Cannot create duplicate user."

    assert session.scalar(select(func.count(col(UserTable.id)))) == 1
    

def test_get_user_by_email(client: TestClient, session: BegunSession) -> None:
    insert_user(USER_001, session)

    response = client.get(f"/api/v1/user?email={USER_001.email}")
    assert response.status_code == 200

    user = UserTable.model_validate(response.json()["user"])
    assert session.scalar(select(UserTable).where(UserTable.id == USER_001.id)) == user


def test_get_nonexistent_user_by_email(client: TestClient, session: BegunSession):
    response = client.get(f"/api/v1/user?email={USER_001.email}")
    assert response.status_code == 404
    assert response.json()["detail"] == "No such user found."

    assert not session.scalar(select(func.count(col(UserTable.id))))


def test_get_user_by_id(client: TestClient, session: BegunSession):
    insert_user(USER_001, session)

    response = client.get(f"/api/v1/user/{USER_001.id}")
    assert response.status_code == 200

    user = UserTable.model_validate(response.json()["user"])
    assert session.scalar(select(UserTable).where(UserTable.id == USER_001.id)) == user


def test_get_nonexistent_user_by_id(client: TestClient, session: BegunSession):
    response = client.get(f"/api/v1/user/{USER_001.id}")
    assert response.status_code == 404
    assert response.json()["detail"] == "No such user found."

    assert not session.scalar(select(func.count(col(UserTable.id))))


def test_get_all_users(client: TestClient, session: BegunSession):
    response_001 = client.get("/api/v1/user/all")
    assert response_001.status_code == 200
    assert response_001.json()["users"] == []

    insert_user(USER_001, session)

    response_002 = client.get("/api/v1/user/all")
    assert response_002.status_code == 200

    users = [UserTable.model_validate(item) for item in response_002.json()["users"]]
    assert list(session.scalars(select(UserTable))) == users
