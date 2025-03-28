# database/tests/test_nutrition_data.py
import pytest
from datetime import datetime, timedelta, timezone

from database.tests.test_data.generator import generate_test_data
from database.nutrition_query import get_user_nutrition_data, get_nutrition_data_by_username

def test_nutrition_data_query(db):
    """Test that nutrition data can be properly queried from the database."""
    # Generate test data
    test_data = generate_test_data(db, user_count=2, days=3)
    
    # Get user ID from test data
    user_id = test_data["users"][0].id
    
    # Query nutrition data
    end_date = datetime.now(timezone.utc)
    start_date = end_date - timedelta(days=2)  # Last 3 days
    
    nutrition_data = get_user_nutrition_data(
        db, 
        user_id, 
        start_date=start_date,
        end_date=end_date
    )
    
    # Validate structure
    assert nutrition_data is not None
    assert nutrition_data["user_id"] == user_id
    assert nutrition_data["username"] == f"test_user_1"
    assert "daily_data" in nutrition_data
    assert "summary" in nutrition_data
    assert "period" in nutrition_data
    assert "targets" in nutrition_data
    
    # Validate period info
    assert nutrition_data["period"]["start_date"] == start_date.strftime("%Y-%m-%d")
    assert nutrition_data["period"]["end_date"] == end_date.strftime("%Y-%m-%d")
    
    # Validate daily data
    assert len(nutrition_data["daily_data"]) > 0
    
    # Validate first day's data structure
    day = nutrition_data["daily_data"][0]
    assert "date" in day
    assert "macros" in day
    assert "meals" in day
    
    # Validate macros
    assert "calories" in day["macros"]
    assert "protein" in day["macros"]
    assert "carbs" in day["macros"]
    assert "fat" in day["macros"]
    
    # Validate meals
    assert len(day["meals"]) > 0
    for meal_name, meal in day["meals"].items():
        assert "calories" in meal
        assert "protein" in meal
        assert "carbs" in meal
        assert "fat" in meal
        assert "foods" in meal
        assert len(meal["foods"]) > 0
        
        # Validate foods
        for food in meal["foods"]:
            assert "name" in food
            assert "calories" in food
            assert "protein" in food
            assert "carbs" in food
            assert "fat" in food
            assert "quantity" in food
    
    # Validate summary
    assert "averages" in nutrition_data["summary"]
    assert "calories" in nutrition_data["summary"]["averages"]
    assert "protein" in nutrition_data["summary"]["averages"]
    
    assert nutrition_data["summary"]["averages"]["calories"] > 0

def test_data_consistency(db):
    """Test that nutrition data is internally consistent."""
    # Generate test data directly
    test_data = generate_test_data(db, user_count=2, days=3)
    
    # Get user ID
    user_id = test_data["users"][0].id
    
    # Get nutrition data
    end_date = datetime.now(timezone.utc)
    start_date = end_date - timedelta(days=2)
    nutrition_data = get_user_nutrition_data(db, user_id, start_date, end_date)
    
    # Verify daily totals match sums of meals
    for day in nutrition_data["daily_data"]:
        # Calculate totals from meals
        total_cals_from_meals = sum(meal["calories"] for meal in day["meals"].values())
        total_protein_from_meals = sum(meal["protein"] for meal in day["meals"].values())
        total_carbs_from_meals = sum(meal["carbs"] for meal in day["meals"].values())
        total_fat_from_meals = sum(meal["fat"] for meal in day["meals"].values())
        
        # Compare with daily totals (allow for rounding differences)
        assert abs(day["macros"]["calories"]["amount"] - total_cals_from_meals) <= 1
        assert abs(day["macros"]["protein"]["amount"] - total_protein_from_meals) <= 1
        assert abs(day["macros"]["carbs"]["amount"] - total_carbs_from_meals) <= 1
        assert abs(day["macros"]["fat"]["amount"] - total_fat_from_meals) <= 1


def test_nutrition_data_by_username(db):
    """Test retrieving nutrition data by username."""
    # Generate test data
    test_data = generate_test_data(db, user_count=1, days=2)
    username = test_data["users"][0].username
    
    # Get nutrition data by username
    nutrition_data = get_nutrition_data_by_username(db, username)
    
    # Verify data was retrieved
    assert nutrition_data is not None
    assert nutrition_data["username"] == username
    assert len(nutrition_data["daily_data"]) > 0

def test_nonexistent_user(db):
    """Test that query returns None for nonexistent user."""
    # Try to get data for a nonexistent user
    nutrition_data = get_user_nutrition_data(db, 999)  # Assuming ID 999 doesn't exist
    
    # Verify None is returned
    assert nutrition_data is None
