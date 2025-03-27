
from datetime import datetime, timedelta, timezone
import random
import json
import os

def generate_user_data(user_id=1, days=30):
    """Generate sample nutrition tracking data for a user over a specified time period.
    
    Args:
        user_id (int): The ID of the user
        days (int): Number of days of data to generate
        
    Returns:
        dict: Structured data ready for front-end consumption
    """
    
    start_date = datetime.now(timezone.utc) - timedelta(days=days)
    
    calorie_target = 2200
    protein_target = 140  # grams
    carbs_target = 250    # grams
    fat_target = 70       # grams

    micronutrient_targets = {
        "Vitamin A": {"target": 900, "unit": "μg"},
        "Vitamin C": {"target": 90, "unit": "mg"},
        "Vitamin D": {"target": 20, "unit": "μg"},
        "Calcium": {"target": 1000, "unit": "mg"},
        "Iron": {"target": 18, "unit": "mg"},
        "Magnesium": {"target": 400, "unit": "mg"},
        "Zinc": {"target": 11, "unit": "mg"},
        "Potassium": {"target": 3500, "unit": "mg"}
    }
    
    # Generate data for each day
    daily_data = []
    for day in range(days):
        current_date = start_date + timedelta(days=day)
        date_str = current_date.strftime("%Y-%m-%d")
        
        # Generate random data with some patterns
        # Weekends (pattern: less healthy eating)
        is_weekend = current_date.weekday() >= 5
        
        randomizer = random.uniform(0.8, 1.2)
        weekend_factor = 1.2 if is_weekend else 1.0
        
        # Generate macronutrient values with some variation
        calories = round(calorie_target * randomizer * weekend_factor)
        protein = round(protein_target * randomizer * (0.9 if is_weekend else 1.1))
        carbs = round(carbs_target * randomizer * weekend_factor)
        fat = round(fat_target * randomizer * weekend_factor)
        
        # Generate micronutrient values
        daily_micros = {}
        for micro, details in micronutrient_targets.items():
            micro_factor = random.uniform(0.6, 1.4) 
            target = details["target"]
            daily_micros[micro] = {
                "amount": round(target * micro_factor, 1),
                "unit": details["unit"],
                "target": target
            }
        
        # Generate meal breakdown (breakfast, lunch, dinner, snacks)
        meals = generate_meal_data(calories, protein, carbs, fat)
        
        daily_entry = {
            "date": date_str,
            "macros": {
                "calories": {
                    "amount": calories,
                    "target": calorie_target
                },
                "protein": {
                    "amount": protein,
                    "target": protein_target,
                    "unit": "g"
                },
                "carbs": {
                    "amount": carbs,
                    "target": carbs_target,
                    "unit": "g"
                },
                "fat": {
                    "amount": fat,
                    "target": fat_target,
                    "unit": "g"
                },
                "percent_targets_met": {
                    "calories": round(calories / calorie_target * 100),
                    "protein": round(protein / protein_target * 100),
                    "carbs": round(carbs / carbs_target * 100),
                    "fat": round(fat / fat_target * 100)
                }
            },
            "micros": daily_micros,
            "meals": meals
        }
        
        daily_data.append(daily_entry)
    
    # Build final data structure
    user_nutrition_data = {
        "user_id": user_id,
        "username": f"user_{user_id}",
        "period": {
            "start_date": start_date.strftime("%Y-%m-%d"),
            "end_date": datetime.now(timezone.utc).strftime("%Y-%m-%d"),
            "days": days
        },
        "targets": {
            "calories": calorie_target,
            "protein": protein_target,
            "carbs": carbs_target,
            "fat": fat_target,
            "micros": {name: details["target"] for name, details in micronutrient_targets.items()}
        },
        "daily_data": daily_data,
        "summary": generate_summary(daily_data)
    }
    
    return user_nutrition_data

def generate_meal_data(total_calories, total_protein, total_carbs, total_fat):
    """Generate random meal breakdown for a day."""
    # Define meal distribution (approximate percentages)
    meal_distribution = {
        "breakfast": {"calories": 0.25, "protein": 0.2, "carbs": 0.3, "fat": 0.2},
        "lunch": {"calories": 0.35, "protein": 0.4, "carbs": 0.3, "fat": 0.35},
        "dinner": {"calories": 0.3, "protein": 0.35, "carbs": 0.3, "fat": 0.35},
        "snacks": {"calories": 0.1, "protein": 0.05, "carbs": 0.1, "fat": 0.1}
    }
    
    # Add some randomness to the distribution
    for meal, nutrients in meal_distribution.items():
        for nutrient in nutrients:
            # Add +/- 20% randomness
            meal_distribution[meal][nutrient] *= random.uniform(0.8, 1.2)
    
    # Normalize to ensure totals add up to 100%
    for nutrient in ["calories", "protein", "carbs", "fat"]:
        total = sum(meal_distribution[meal][nutrient] for meal in meal_distribution)
        if total > 0:  # Avoid division by zero
            for meal in meal_distribution:
                meal_distribution[meal][nutrient] /= total
    
    # Generate meal data
    meals = {}
    for meal_name, distribution in meal_distribution.items():
        meals[meal_name] = {
            "calories": round(total_calories * distribution["calories"]),
            "protein": round(total_protein * distribution["protein"]),
            "carbs": round(total_carbs * distribution["carbs"]),
            "fat": round(total_fat * distribution["fat"]),
            "foods": generate_sample_foods(meal_name)
        }
    
    return meals

def generate_sample_foods(meal_type):
    """Generate sample foods for different meal types."""
    # Sample food options by meal type
    food_options = {
        "breakfast": [
            {"name": "Oatmeal", "calories": 150, "protein": 5, "carbs": 27, "fat": 3, "portion": "1 cup"},
            {"name": "Eggs", "calories": 140, "protein": 12, "carbs": 1, "fat": 10, "portion": "2 eggs"},
            {"name": "Banana", "calories": 105, "protein": 1, "carbs": 27, "fat": 0, "portion": "1 medium"},
            {"name": "Greek Yogurt", "calories": 130, "protein": 17, "carbs": 6, "fat": 4, "portion": "1 container"},
            {"name": "Toast", "calories": 75, "protein": 3, "carbs": 13, "fat": 1, "portion": "1 slice"}
        ],
        "lunch": [
            {"name": "Chicken Salad", "calories": 320, "protein": 30, "carbs": 10, "fat": 18, "portion": "1 bowl"},
            {"name": "Sandwich", "calories": 350, "protein": 15, "carbs": 40, "fat": 12, "portion": "1 sandwich"},
            {"name": "Soup", "calories": 200, "protein": 8, "carbs": 25, "fat": 8, "portion": "1 bowl"},
            {"name": "Burrito", "calories": 650, "protein": 25, "carbs": 80, "fat": 22, "portion": "1 burrito"}
        ],
        "dinner": [
            {"name": "Salmon", "calories": 280, "protein": 39, "carbs": 0, "fat": 13, "portion": "6 oz"},
            {"name": "Brown Rice", "calories": 215, "protein": 5, "carbs": 45, "fat": 2, "portion": "1 cup"},
            {"name": "Broccoli", "calories": 55, "protein": 4, "carbs": 11, "fat": 0, "portion": "1 cup"},
            {"name": "Pasta", "calories": 380, "protein": 14, "carbs": 75, "fat": 2, "portion": "1.5 cups"},
            {"name": "Chicken Breast", "calories": 165, "protein": 31, "carbs": 0, "fat": 3.6, "portion": "1 breast"}
        ],
        "snacks": [
            {"name": "Apple", "calories": 95, "protein": 0.5, "carbs": 25, "fat": 0.3, "portion": "1 medium"},
            {"name": "Almonds", "calories": 165, "protein": 6, "carbs": 6, "fat": 14, "portion": "1/4 cup"},
            {"name": "Protein Bar", "calories": 200, "protein": 20, "carbs": 25, "fat": 5, "portion": "1 bar"},
            {"name": "Cheese", "calories": 110, "protein": 7, "carbs": 0, "fat": 9, "portion": "1 oz"},
            {"name": "Chips", "calories": 160, "protein": 2, "carbs": 15, "fat": 10, "portion": "1 small bag"}
        ]
    }
    
    # Select 1-3 random foods for this meal
    num_foods = random.randint(1, 3)
    selected_foods = random.sample(food_options[meal_type], min(num_foods, len(food_options[meal_type])))
    
    # Apply some quantity variation
    for food in selected_foods:
        food["quantity"] = round(random.uniform(0.5, 2.0), 1)
        # Adjust nutrient values based on quantity
        for nutrient in ["calories", "protein", "carbs", "fat"]:
            food[nutrient] = round(food[nutrient] * food["quantity"])
    
    return selected_foods

def generate_summary(daily_data):
    """Generate summary statistics from the daily data."""
    num_days = len(daily_data)
    if num_days == 0:
        return {}
    
    # Extract all macro values
    calories = [day["macros"]["calories"]["amount"] for day in daily_data]
    protein = [day["macros"]["protein"]["amount"] for day in daily_data]
    carbs = [day["macros"]["carbs"]["amount"] for day in daily_data]
    fat = [day["macros"]["fat"]["amount"] for day in daily_data]
    
    # Calculate averages
    avg_calories = sum(calories) / num_days
    avg_protein = sum(protein) / num_days
    avg_carbs = sum(carbs) / num_days
    avg_fat = sum(fat) / num_days
    
    # Calculate compliance (percent of days meeting at least 90% of target)
    calorie_target = daily_data[0]["macros"]["calories"]["target"]
    protein_target = daily_data[0]["macros"]["protein"]["target"]
    carbs_target = daily_data[0]["macros"]["carbs"]["target"]
    fat_target = daily_data[0]["macros"]["fat"]["target"]
    
    calorie_compliance = sum(1 for cal in calories if cal >= 0.9 * calorie_target) / num_days * 100
    protein_compliance = sum(1 for p in protein if p >= 0.9 * protein_target) / num_days * 100
    carbs_compliance = sum(1 for c in carbs if c >= 0.9 * carbs_target) / num_days * 100
    fat_compliance = sum(1 for f in fat if f >= 0.9 * fat_target) / num_days * 100
    
    # Find best and worst days for each macro
    best_calorie_day = daily_data[calories.index(max(calories))]["date"]
    worst_calorie_day = daily_data[calories.index(min(calories))]["date"]
    best_protein_day = daily_data[protein.index(max(protein))]["date"]
    worst_protein_day = daily_data[protein.index(min(protein))]["date"]
    
    # Calculate trends (simple linear: end value - start value)
    calories_trend = calories[-1] - calories[0]
    protein_trend = protein[-1] - protein[0]
    
    # Compile micronutrient summary
    micros_summary = {}
    if "micros" in daily_data[0]:
        for micro_name in daily_data[0]["micros"]:
            values = [day["micros"][micro_name]["amount"] for day in daily_data]
            target = daily_data[0]["micros"][micro_name]["target"]
            
            micros_summary[micro_name] = {
                "average": round(sum(values) / num_days, 1),
                "compliance": round(sum(1 for v in values if v >= 0.9 * target) / num_days * 100),
                "unit": daily_data[0]["micros"][micro_name]["unit"]
            }
    
    return {
        "averages": {
            "calories": round(avg_calories),
            "protein": round(avg_protein),
            "carbs": round(avg_carbs),
            "fat": round(avg_fat)
        },
        "compliance": {
            "calories": round(calorie_compliance),
            "protein": round(protein_compliance),
            "carbs": round(carbs_compliance),
            "fat": round(fat_compliance)
        },
        "notable_days": {
            "best_calorie_day": best_calorie_day,
            "worst_calorie_day": worst_calorie_day,
            "best_protein_day": best_protein_day,
            "worst_protein_day": worst_protein_day
        },
        "trends": {
            "calories": calories_trend,
            "protein": protein_trend
        },
        "micros": micros_summary
    }

def save_test_data():
    """Generate test data for multiple users and save to JSON files."""
    # Create test data directory if it doesn't exist
    data_dir = "test_data"
    os.makedirs(data_dir, exist_ok=True)
    
    # Generate data for three different users with different patterns
    users_data = [
        generate_user_data(user_id=1, days=30),  # 30 days of data
        generate_user_data(user_id=2, days=90),  # 90 days of data
        generate_user_data(user_id=3, days=14)   # 14 days of data
    ]
    
    # Save each user's data to a separate file
    for user_data in users_data:
        user_id = user_data["user_id"]
        filename = f"{data_dir}/user_{user_id}_nutrition_data.json"
        
        with open(filename, 'w') as f:
            json.dump(user_data, f, indent=2)
        
        print(f"Saved test data for user {user_id} to {filename}")
    
    # Save a combined dataset
    combined_filename = f"{data_dir}/all_users_nutrition_data.json"
    with open(combined_filename, 'w') as f:
        json.dump(users_data, f, indent=2)
    
    print(f"Saved combined data for all users to {combined_filename}")

if __name__ == "__main__":
    save_test_data()
