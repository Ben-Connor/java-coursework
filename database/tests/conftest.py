# database/tests/conftest.py
import os
import pytest
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from database.schema import Base
from datetime import datetime, timedelta, timezone
from database.tests.test_data.generator import generate_test_data
from database.nutrition_query import get_user_nutrition_data

# File-based SQLite database for testing
TEST_DATABASE_URL = "sqlite:///test_nutrition_tracker.db"

@pytest.fixture(scope="session")
def test_engine():
    engine = create_engine(TEST_DATABASE_URL)
    
    # Drop all tables first if they exist
    Base.metadata.drop_all(bind=engine)
    
    # Create all tables fresh
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
        # Clear all tables before each test for isolation
        for table in reversed(Base.metadata.sorted_tables):
            db.execute(text(f"DELETE FROM {table.name}"))
        db.commit()
        
        yield db
    finally:
        db.rollback()
        db.close()
        
@pytest.fixture
def populated_db(db):
    """A database pre-populated with test data."""
    test_data = generate_test_data(db, user_count=2, days=3)
    return {
        "db": db,
        "test_data": test_data
    }

@pytest.fixture
def user_nutrition_data(populated_db):
    """Sample nutrition data for a user."""
    db = populated_db["db"]
    user_id = populated_db["test_data"]["users"][0].id
    
    end_date = datetime.now(timezone.utc)
    start_date = end_date - timedelta(days=2)
    
    return get_user_nutrition_data(db, user_id, start_date, end_date)
