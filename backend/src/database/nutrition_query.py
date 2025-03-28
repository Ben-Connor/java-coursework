from datetime import datetime, timedelta, timezone
from typing import Dict, List, Optional, Any
from sqlalchemy import func
from sqlalchemy.orm import Session

from schema import User, Food, UserMacroLog, Micronutrient, FoodMicronutrient, UserMicroLog
from queries import get_user_by_username, get_user_food_logs, get_food_micronutrients

def get_user_nutrition_data(
    db: Session, 
    user_id: int, 
    start_date: Optional[datetime] = None, 
    end_date: Optional[datetime] = None
) -> Optional[Dict[str, Any]]:
    """
    Query the database to retrieve nutrition data for a user in a structured format.
    
    Args:
        db (Session): Database session
        user_id (int): User ID to get data for
        start_date (Optional[datetime]): Start date for data range (defaults to 7 days ago)
        end_date (Optional[datetime]): End date for data range (defaults to today)
        
    Returns:
        Dict containing structured nutrition data or None if user not found
    """
    try:
        # Get user
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            return None
        
        # Set default date range if not provided
        if not end_date:
            end_date = datetime.now(timezone.utc)
        if not start_date:
            start_date = end_date - timedelta(days=7)
        
        # Format dates for response
        start_date_str = start_date.strftime("%Y-%m-%d")
        end_date_str = end_date.strftime("%Y-%m-%d")
        
        # Calculate the number of days in the range
        days = (end_date - start_date).days + 1
        
        # Get food logs within date range
        food_logs = db.query(UserMacroLog).join(Food).\
            filter(UserMacroLog.user_id == user_id).\
            filter(UserMacroLog.timestamp >= start_date).\
            filter(UserMacroLog.timestamp <= end_date).\
            order_by(UserMacroLog.timestamp).all()
        
        # Define targets (in a real app, these would come from user settings)
        calorie_target = 2200
        protein_target = 140
        carbs_target = 250
        fat_target = 70
        
        micronutrient_targets = {
            "Vitamin C": {"target": 90, "unit": "mg"},
            "Calcium": {"target": 1000, "unit": "mg"},
            "Iron": {"target": 18, "unit": "mg"}
        }
        
        # Process the food logs by date
        daily_logs = {}
        for log in food_logs:
            date_str = log.timestamp.strftime("%Y-%m-%d")
            if date_str not in daily_logs:
                daily_logs[date_str] = []
            daily_logs[date_str].append(log)
        
        # Generate daily data
        daily_data = []
        
        for date_str in sorted(daily_logs.keys()):
            logs = daily_logs[date_str]
            
            # Organize logs by meal (based on timestamp)
            meal_logs = {}
            for log in logs:
                hour = log.timestamp.hour
                
                # Determine meal based on time
                if hour < 11:  # Before 11 AM
                    meal_name = "breakfast"
                elif hour < 16:  # Before 4 PM
                    meal_name = "lunch"
                else:  # 4 PM or later
                    meal_name = "dinner"
                
                # Add log to appropriate meal
                if meal_name not in meal_logs:
                    meal_logs[meal_name] = []
                meal_logs[meal_name].append(log)
            
            # Process each meal
            meals = {}
            total_calories = 0
            total_protein = 0
            total_carbs = 0
            total_fat = 0
            
            for meal_name, logs in meal_logs.items():
                meal_calories = 0
                meal_protein = 0
                meal_carbs = 0
                meal_fat = 0
                foods = []
                
                for log in logs:
                    food = log.food
                    quantity = log.quantity
                    
                    # Calculate nutrient amounts for this quantity
                    food_calories = food.calories * quantity
                    food_protein = food.protein * quantity
                    food_carbs = food.carbs * quantity
                    food_fat = food.fat * quantity
                    
                    # Add to meal totals
                    meal_calories += food_calories
                    meal_protein += food_protein
                    meal_carbs += food_carbs
                    meal_fat += food_fat
                    
                    # Add food to meal
                    foods.append({
                        "name": food.name,
                        "calories": food.calories,
                        "protein": food.protein,
                        "carbs": food.carbs,
                        "fat": food.fat,
                        "portion": "1 serving",  # This would come from food metadata
                        "quantity": quantity
                    })
                
                # Create the meal entry
                meals[meal_name] = {
                    "calories": round(meal_calories),
                    "protein": round(meal_protein),
                    "carbs": round(meal_carbs),
                    "fat": round(meal_fat),
                    "foods": foods
                }
                
                # Add to daily totals
                total_calories += meal_calories
                total_protein += meal_protein
                total_carbs += meal_carbs
                total_fat += meal_fat
            
            # Generate micronutrient data for this day
            # In a real implementation, this would be calculated from the food logs
            # based on the micronutrient content of each food
            micros = {}
            for micro_name, details in micronutrient_targets.items():
                # This is a simplified approach - normally would calculate from foods
                target = details["target"]
                unit = details["unit"]
                
                # Approximate the micronutrient amount based on calorie intake
                # This is just for demo purposes
                ratio = total_calories / calorie_target
                amount = round(target * ratio * (0.6 + 0.8 * ratio), 1)
                
                micros[micro_name] = {
                    "amount": amount,
                    "unit": unit,
                    "target": target
                }
            
            # Create the daily entry
            daily_entry = {
                "date": date_str,
                "macros": {
                    "calories": {"amount": round(total_calories), "target": calorie_target},
                    "protein": {"amount": round(total_protein), "target": protein_target, "unit": "g"},
                    "carbs": {"amount": round(total_carbs), "target": carbs_target, "unit": "g"},
                    "fat": {"amount": round(total_fat), "target": fat_target, "unit": "g"}
                },
                "micros": micros,
                "meals": meals
            }
            
            daily_data.append(daily_entry)
        
        # Generate summary statistics
        summary = {}
        if daily_data:
            calories_avg = sum(day["macros"]["calories"]["amount"] for day in daily_data) / len(daily_data)
            protein_avg = sum(day["macros"]["protein"]["amount"] for day in daily_data) / len(daily_data)
            summary = {
                "averages": {
                    "calories": round(calories_avg),
                    "protein": round(protein_avg)
                }
            }
        
        # Build the complete response
        user_nutrition_data = {
            "user_id": user.id,
            "username": user.username,
            "period": {
                "start_date": start_date_str,
                "end_date": end_date_str,
                "days": days
            },
            "targets": {
                "calories": calorie_target,
                "protein": protein_target,
                "carbs": carbs_target,
                "fat": fat_target
            },
            "daily_data": daily_data,
            "summary": summary
        }
        
        return user_nutrition_data
    
    except Exception as e:
        print(f"Error getting user nutrition data: {e}")
        return None


def get_nutrition_data_by_username(
    db: Session, 
    username: str, 
    start_date: Optional[datetime] = None, 
    end_date: Optional[datetime] = None
) -> Optional[Dict[str, Any]]:
    """
    Convenience function to get nutrition data by username instead of user ID.
    
    Args:
        db (Session): Database session
        username (str): Username to get data for
        start_date (Optional[datetime]): Start date for data range (defaults to 7 days ago)
        end_date (Optional[datetime]): End date for data range (defaults to today)
        
    Returns:
        Dict containing structured nutrition data or None if user not found
    """
    user = db.query(User).filter(User.username == username).first()
    if not user:
        return None
    
    return get_user_nutrition_data(db, user.id, start_date, end_date)
