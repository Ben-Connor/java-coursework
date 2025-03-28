# database/scripts/get_graph_data.py
import json
from datetime import datetime, timedelta, timezone
import sys 
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

# These imports will work with Poetry since your files are in the correct structure
from database.db import SessionLocal
from database.schema import User
from nutrition_query import get_user_nutrition_data

def get_data_for_graphing(user_id=1, days=30, output_file=None):
    """
    Get nutrition data for graphing and optionally save to a JSON file.
    """
    # Get a database session
    db = SessionLocal()
    
    try:
        # Get date range
        end_date = datetime.now(timezone.utc)
        start_date = end_date - timedelta(days=days)
        
        # Verify the user exists
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            print(f"User with ID {user_id} not found!")
            return None
            
        # Use existing function to get nutrition data
        nutrition_data = get_user_nutrition_data(db, user_id, start_date, end_date)
        
        if not nutrition_data:
            print(f"No nutrition data found for user {user_id}")
            return None
        
        # Print a summary
        print(f"Retrieved data for user ID: {nutrition_data['user_id']}")
        print(f"Username: {nutrition_data['username']}")
        print(f"Date range: {nutrition_data['period']['start_date']} to {nutrition_data['period']['end_date']}")
        print(f"Days of data: {len(nutrition_data['daily_data'])}")
        
        # Save to file if requested
        if output_file:
            with open(output_file, "w") as f:
                json.dump(nutrition_data, f, indent=2)
                print(f"Data saved to {output_file}")
        
        return nutrition_data
    
    except Exception as e:
        print(f"Error getting nutrition data: {e}")
        return None
    finally:
        db.close()

def list_available_users():
    """List all users in the database."""
    db = SessionLocal()
    try:
        users = db.query(User).all()
        if not users:
            print("No users found in database.")
            return
        
        print(f"Found {len(users)} users:")
        for user in users:
            print(f"  ID: {user.id}, Username: {user.username}")
    finally:
        db.close()

def main():
    import argparse
    
    parser = argparse.ArgumentParser(description="Get nutrition data for graphing")
    parser.add_argument("--user", type=int, help="User ID to get data for")
    parser.add_argument("--days", type=int, default=30, help="Number of days of data to retrieve")
    parser.add_argument("--output", help="Output file to save data (JSON format)")
    parser.add_argument("--list-users", action="store_true", help="List all users in the database")
    
    args = parser.parse_args()
    
    if args.list_users:
        list_available_users()
    elif args.user:
        output_file = args.output or f"user_{args.user}_nutrition_data.json"
        get_data_for_graphing(user_id=args.user, days=args.days, output_file=output_file)
    else:
        parser.print_help()

if __name__ == "__main__":
    main()
