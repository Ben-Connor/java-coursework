# database/tests/test_data/generator.py
from datetime import datetime, timedelta, timezone
import random

from database.queries import (
    add_user, add_food, add_micronutrient, add_food_micronutrient, 
    log_user_food, log_user_micronutrient_consumption, add_food_source
)

class TestDataGenerator:
    def __init__(self, db, seed=42):
        """Initialize with database session and random seed."""
        self.db = db
        self.random = random.Random(seed)
        
    def generate_test_users(self, count=2):
        """Generate test users in the database."""
        users = []
        for i in range(1, count+1):
            user = add_user(
                self.db, 
                username=f"test_user_{i}",
                email=f"user{i}@example.com",
                password_hash=f"hashed_password_{i}"
            )
            users.append(user)
        return users
        
    def generate_test_foods(self):
        """Generate common foods in the database."""
        foods = {}
        
        # Breakfast foods
        foods["oatmeal"] = add_food(self.db, "Oatmeal", 150, 5, 27, 3)
        foods["egg"] = add_food(self.db, "Egg", 70, 6, 0.5, 5)
        foods["toast"] = add_food(self.db, "Toast", 75, 3, 13, 1)
        
        # Lunch/Dinner foods
        foods["chicken_breast"] = add_food(self.db, "Chicken Breast", 165, 31, 0, 3.6)
        foods["rice"] = add_food(self.db, "Brown Rice", 215, 5, 45, 2)
        foods["broccoli"] = add_food(self.db, "Broccoli", 55, 3.7, 11, 0.6)
        
        # Add sources for some foods
        add_food_source(self.db, foods["chicken_breast"].id, "USDA", "05062")
        add_food_source(self.db, foods["broccoli"].id, "USDA", "11090")
        
        return foods
        
    def generate_test_micronutrients(self):
        """Generate micronutrients in the database."""
        micros = {}
        
        # Essential vitamins and minerals
        micros["vitamin_c"] = add_micronutrient(self.db, "Vitamin C", "mg")
        micros["calcium"] = add_micronutrient(self.db, "Calcium", "mg")
        micros["iron"] = add_micronutrient(self.db, "Iron", "mg")
        
        return micros
        
    def add_micronutrients_to_foods(self, foods, micros):
        """Add micronutrients to foods in the database."""
        # Oatmeal micros
        add_food_micronutrient(self.db, foods["oatmeal"].id, micros["calcium"].id, 54.0)
        add_food_micronutrient(self.db, foods["oatmeal"].id, micros["iron"].id, 1.8)
        
        # Chicken breast micros
        add_food_micronutrient(self.db, foods["chicken_breast"].id, micros["iron"].id, 1.0)
        
        # Broccoli micros
        add_food_micronutrient(self.db, foods["broccoli"].id, micros["vitamin_c"].id, 89.2)
        add_food_micronutrient(self.db, foods["broccoli"].id, micros["calcium"].id, 47.0)
        add_food_micronutrient(self.db, foods["broccoli"].id, micros["iron"].id, 0.7)
    
    def log_user_meals(self, users, foods, days=3):
        """Log food consumption for users over several days."""
        start_date = datetime.now(timezone.utc).replace(hour=0, minute=0, second=0, microsecond=0)
        
        for user in users:
            for day in range(days):
                # Calculate the date for this day's logs
                current_date = start_date - timedelta(days=day)
                
                # Breakfast (around 8 AM)
                breakfast_time = current_date.replace(hour=8, minute=self.random.randint(0, 59))
                
                # Log oatmeal for breakfast
                oatmeal_quantity = round(self.random.uniform(1.0, 2.0), 1)  # 1-2 servings
                self._log_with_timestamp(user.id, foods["oatmeal"].id, oatmeal_quantity, breakfast_time)
                
                # Sometimes have an egg with breakfast
                if self.random.random() > 0.3:  # 70% chance
                    egg_quantity = self.random.randint(1, 2)  # 1-2 eggs
                    self._log_with_timestamp(user.id, foods["egg"].id, egg_quantity, breakfast_time)
                
                # Lunch (around 1 PM)
                lunch_time = current_date.replace(hour=13, minute=self.random.randint(0, 59))
                
                # Log chicken and rice for lunch
                chicken_quantity = round(self.random.uniform(0.8, 1.5), 1)  # 0.8-1.5 servings
                self._log_with_timestamp(user.id, foods["chicken_breast"].id, chicken_quantity, lunch_time)
                
                rice_quantity = round(self.random.uniform(0.7, 1.3), 1)  # 0.7-1.3 servings
                self._log_with_timestamp(user.id, foods["rice"].id, rice_quantity, lunch_time)
                
                # Dinner (around 7 PM)
                dinner_time = current_date.replace(hour=19, minute=self.random.randint(0, 59))
                
                # Log food for dinner
                if self.random.random() > 0.5:  # 50% chance for chicken again
                    dinner_chicken = round(self.random.uniform(1.0, 1.8), 1)  # 1.0-1.8 servings
                    self._log_with_timestamp(user.id, foods["chicken_breast"].id, dinner_chicken, dinner_time)
                
                # Always have some broccoli with dinner
                broccoli_quantity = round(self.random.uniform(1.0, 2.5), 1)  # 1.0-2.5 servings
                self._log_with_timestamp(user.id, foods["broccoli"].id, broccoli_quantity, dinner_time)
    
    def _log_with_timestamp(self, user_id, food_id, quantity, timestamp):
        """Log food with a specific timestamp."""
        # Create the log in database
        log = log_user_food(self.db, user_id, food_id, quantity)
        
        # Update the timestamp
        if log:
            log.timestamp = timestamp
            self.db.commit()
    
    def generate_complete_test_data(self, user_count=2, days=3):
        """Generate a complete set of test data."""
        users = self.generate_test_users(user_count)
        foods = self.generate_test_foods()
        micros = self.generate_test_micronutrients()
        self.add_micronutrients_to_foods(foods, micros)
        self.log_user_meals(users, foods, days)
        
        return {
            "users": users,
            "foods": foods,
            "micronutrients": micros
        }


# Helper function to use in tests
def generate_test_data(db, user_count=2, days=3):
    """Generate a complete set of test data in the database."""
    generator = TestDataGenerator(db)
    return generator.generate_complete_test_data(user_count, days)
