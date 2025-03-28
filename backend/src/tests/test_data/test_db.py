# tests/test_db.py
from pathlib import Path
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from schema import Base

# Create the tests/test_data directory if it doesn't exist
data_dir = Path("tests") / "test_data"
data_dir.mkdir(parents=True, exist_ok=True)

# Define test database path
TEST_DB_PATH = data_dir / "test.db"
TEST_DB_URL = f"sqlite:///{TEST_DB_PATH}"

# Create engine and session
test_engine = create_engine(TEST_DB_URL)
TestSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=test_engine)

# Rest of the code remains similar...

def get_test_db():
    """Get a test database session."""
    db = TestSessionLocal()
    try:
        yield db
    finally:
        db.close()

def create_test_tables():
    """Create all tables in the test database."""
    Base.metadata.create_all(bind=test_engine)

def drop_test_tables():
    """Drop all tables from the test database."""
    Base.metadata.drop_all(bind=test_engine)

def reset_test_db():
    """Reset the test database by dropping and recreating all tables."""
    drop_test_tables()
    create_test_tables()
