# database/scripts/populate_test_db.py
from database.db import engine, SessionLocal
from database.schema import Base
from database.tests.test_data.generator import generate_test_data
import sys 
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

def populate_database(days=30, user_count=3):
    """Populate the database with test data."""
    print(f"Creating tables in database...")
    Base.metadata.create_all(bind=engine)
    
    # Get a database session
    db = SessionLocal()
    
    try:
        print(f"Generating {days} days of test data for {user_count} users...")
        test_data = generate_test_data(db, user_count=user_count, days=days)
        
        # Print summary
        print(f"Created {len(test_data['users'])} users")
        print(f"User IDs: {[user.id for user in test_data['users']]}")
        print(f"Usernames: {[user.username for user in test_data['users']]}")
        
        return test_data
    
    except Exception as e:
        print(f"Error: {e}")
        db.rollback()
        raise
    finally:
        db.close()

def main():
    import argparse
    
    parser = argparse.ArgumentParser(description="Populate database with test data")
    parser.add_argument("--days", type=int, default=30, help="Number of days of data to generate")
    parser.add_argument("--users", type=int, default=3, help="Number of users to create")
    
    args = parser.parse_args()
    
    populate_database(days=args.days, user_count=args.users)
    print("Database population completed!")

if __name__ == "__main__":
    main()
