import os
import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database.schema import Base

# File-based SQLite database for testing
TEST_DATABASE_URL = "sqlite:///test_nutrition_tracker.db"

@pytest.fixture(scope="session")
def test_engine():
    engine = create_engine(TEST_DATABASE_URL)
    
    # Create all tables
    Base.metadata.create_all(bind=engine)
    
    # Provide the engine
    yield engine
    
    # Cleanup after all tests have run
    Base.metadata.drop_all(bind=engine)
    
    if os.path.exists("test_nutrition_tracker.db"):
        os.remove("test_nutrition_tracker.db")

@pytest.fixture
def db(test_engine):
    # Create a new session factory
    TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=test_engine)
    
    # Create a new database session for the test
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.rollback()
        db.close()
