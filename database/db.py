import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from database.schema import Base

# Default to SQLite but prepare for PostgreSQL later
DATABASE_URL = os.environ.get("DATABASE_URL", "sqlite:///nutrition_tracker.db")

if DATABASE_URL.startswith("sqlite:"):
    engine = create_engine(
        DATABASE_URL,
        connect_args={"check_same_thread": False}
    )
else:  # This branch will be used when we switch to PostgreSQL
    engine = create_engine(DATABASE_URL)

# Create session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create all tables defined in the schema
Base.metadata.create_all(bind=engine)

# Dependency for FastAPI to manage database sessions
def get_db():
    """
    Creates and yields a database session.
    
    This function is designed to be used as a FastAPI dependency,
    ensuring proper session handling and cleanup.
    
    Yields:
        SQLAlchemy Session: Database session
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
