from typing import Iterator

import pytest
from fastapi.testclient import TestClient

from ..api import app
from ..api.lib.dependencies import get_session_dependency
from ..database import get_session, get_engine, BegunSession
from ..database.tables import create_tables, drop_tables
from ..database.lib.consts import PoolType


@pytest.fixture(name="session")  
def session_fixture() -> Iterator[BegunSession]:
    engine = get_engine(pool_type=PoolType.STATIC_POOL, check_same_thread=False)
    drop_tables(engine)
    create_tables(engine)
    with get_session(pool_type=PoolType.STATIC_POOL, check_same_thread=False) as session:
        yield session


@pytest.fixture(name="client")
def client_fixture(session: BegunSession) -> Iterator[TestClient]:
    def get_session_override() -> BegunSession:
        return session
    
    app.dependency_overrides[get_session_dependency] = get_session_override
    client = TestClient(app)  
    yield client  
    app.dependency_overrides.clear()  
