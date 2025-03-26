from sqlalchemy.exc import SQLAlchemyError

from database import queries
from database.schema import User, Food, UserMacroLog, UserMicroLog, FoodMicronutrient, Micronutrient, FoodSource

# User Tests
def test_add_user(db):
    """Test adding a new user to the database."""
    # Create a test user
    new_user = queries.add_user(
        db=db,
        username="testuser",
        email="test@example.com",
        password_hash="hashed_password"
    )
    
    # Check returned user
    assert new_user is not None
    assert new_user.id is not None
    assert new_user.username == "testuser"
    assert new_user.email == "test@example.com"
    assert new_user.password_hash == "hashed_password"
    
    # Verify user exists in database
    db_user = db.query(User).filter(User.username == "testuser").first()
    assert db_user is not None
    assert db_user.id == new_user.id
    assert db_user.created_at is not None

def test_add_duplicate_user(db):
    """Test adding a user with duplicate username."""
    # Add first user
    queries.add_user(
        db=db,
        username="duplicate_user",
        email="original@example.com",
        password_hash="password1"
    )
    
    # Try to add duplicate user with same username
    duplicate_user = queries.add_user(
        db=db,
        username="duplicate_user",
        email="another@example.com",
        password_hash="password2"
    )
    
    # The function should handle the error and return None
    assert duplicate_user is None

def test_get_user_by_username(db):
    """Test retrieving a user by username."""
    # Create a test user
    original_user = queries.add_user(
        db=db,
        username="findme",
        email="find@example.com",
        password_hash="findpassword"
    )
    
    # Try to retrieve the user
    found_user = queries.get_user_by_username(db, "findme")
    
    # Verify user was found
    assert found_user is not None
    assert found_user.id == original_user.id
    assert found_user.email == "find@example.com"
    
    # Try to find non-existent user
    missing_user = queries.get_user_by_username(db, "nonexistent")
    assert missing_user is None

def test_get_all_users(db):
    """Test retrieving all users from the database."""
    # Create test users
    queries.add_user(db, username="user1", email="user1@example.com", password_hash="pass1")
    queries.add_user(db, username="user2", email="user2@example.com", password_hash="pass2")
    queries.add_user(db, username="user3", email="user3@example.com", password_hash="pass3")
    
    # Retrieve all users
    all_users = queries.get_all_users(db)
    
    # Verify all users were retrieved
    assert all_users is not None
    assert len(all_users) >= 3
    
    # Verify the test users are in the results
    usernames = [user.username for user in all_users]
    assert "user1" in usernames
    assert "user2" in usernames
    assert "user3" in usernames

# Food Tests
def test_add_food(db):
    """Test adding a new food to the database."""
    # Create a test food
    new_food = queries.add_food(
        db=db,
        name="Apple",
        calories=95,
        protein=0.5,
        carbs=25.0,
        fat=0.3
    )
    
    # Check returned food
    assert new_food is not None
    assert new_food.id is not None
    assert new_food.name == "Apple"
    assert new_food.calories == 95
    assert new_food.protein == 0.5
    assert new_food.carbs == 25.0
    assert new_food.fat == 0.3
    
    # Verify food exists in database
    db_food = db.query(Food).filter(Food.name == "Apple").first()
    assert db_food is not None
    assert db_food.id == new_food.id

def test_get_food_by_name(db):
    """Test retrieving a food by its name."""
    # Create a test food
    queries.add_food(
        db=db,
        name="Banana",
        calories=105,
        protein=1.3,
        carbs=27.0,
        fat=0.4
    )
    
    # Try to retrieve the food
    found_food = queries.get_food_by_name(db, "Banana")
    
    # Verify food was found
    assert found_food is not None
    assert found_food.name == "Banana"
    assert found_food.calories == 105
    
    # Try to find non-existent food
    missing_food = queries.get_food_by_name(db, "Nonexistent Food")
    assert missing_food is None

# UserMacroLog Tests
def test_log_user_food(db):
    """Test logging a food item consumed by a user."""
    # Create test user and food
    user = queries.add_user(db, username="foodlogger", email="logger@example.com", password_hash="logpass")
    food = queries.add_food(db, name="Pizza Slice", calories=250, protein=12, carbs=30, fat=10)
    
    # Log the food consumption
    food_log = queries.log_user_food(db, user.id, food.id, 2.0)  # 2 slices
    
    # Check returned log
    assert food_log is not None
    assert food_log.id is not None
    assert food_log.user_id == user.id
    assert food_log.food_id == food.id
    assert food_log.quantity == 2.0
    
    # Verify log exists in database
    db_log = db.query(UserMacroLog).filter(
        UserMacroLog.user_id == user.id,
        UserMacroLog.food_id == food.id
    ).first()
    assert db_log is not None
    assert db_log.quantity == 2.0

def test_get_user_food_logs(db):
    """Test retrieving all food logs for a specific user."""
    # Create test user and foods
    user = queries.add_user(db, username="meallogger", email="meals@example.com", password_hash="mealpass")
    food1 = queries.add_food(db, name="Oatmeal", calories=150, protein=5, carbs=25, fat=3)
    food2 = queries.add_food(db, name="Chicken Breast", calories=165, protein=31, carbs=0, fat=3.6)
    
    # Log multiple food items
    queries.log_user_food(db, user.id, food1.id, 1.0)
    queries.log_user_food(db, user.id, food2.id, 1.5)
    
    # Retrieve the user's food logs
    user_logs = queries.get_user_food_logs(db, user.id)
    
    # Verify logs were retrieved
    assert user_logs is not None
    assert len(user_logs) == 2
    
    # Verify log details
    log_foods = [(log.food_id, log.quantity) for log in user_logs]
    assert (food1.id, 1.0) in log_foods
    assert (food2.id, 1.5) in log_foods

# Micronutrient Tests
def test_add_micronutrient(db):
    """Test adding a new micronutrient to the database."""
    # Create a test micronutrient
    new_micro = queries.add_micronutrient(
        db=db,
        name="Vitamin C",
        unit="mg"
    )
    
    # Check returned micronutrient
    assert new_micro is not None
    assert new_micro.id is not None
    assert new_micro.name == "Vitamin C"
    assert new_micro.unit == "mg"
    
    # Verify micronutrient exists in database
    db_micro = db.query(Micronutrient).filter(Micronutrient.name == "Vitamin C").first()
    assert db_micro is not None
    assert db_micro.id == new_micro.id

def test_get_micronutrient_by_name(db):
    """Test retrieving a micronutrient by its name."""
    # Create a test micronutrient
    queries.add_micronutrient(db, name="Vitamin D", unit="μg")
    
    # Try to retrieve the micronutrient
    found_micro = queries.get_micronutrient_by_name(db, "Vitamin D")
    
    # Verify micronutrient was found
    assert found_micro is not None
    assert found_micro.name == "Vitamin D"
    assert found_micro.unit == "μg"
    
    # Try to find non-existent micronutrient
    missing_micro = queries.get_micronutrient_by_name(db, "Nonexistent Vitamin")
    assert missing_micro is None

# FoodMicronutrient Tests
def test_add_food_micronutrient(db):
    """Test adding micronutrient data to a food."""
    # Create test food and micronutrient
    food = queries.add_food(db, name="Orange", calories=62, protein=1.2, carbs=15.4, fat=0.2)
    micro = queries.add_micronutrient(db, name="Vitamin C", unit="mg")
    
    # Add micronutrient to food
    food_micro = queries.add_food_micronutrient(
        db=db,
        food_id=food.id,
        micronutrient_id=micro.id,
        amount=70.0
    )
    
    # Check returned food micronutrient
    assert food_micro is not None
    assert food_micro.id is not None
    assert food_micro.food_id == food.id
    assert food_micro.micronutrient_id == micro.id
    assert food_micro.amount == 70.0
    
    # Verify relationship in database
    db_food_micro = db.query(FoodMicronutrient).filter(
        FoodMicronutrient.food_id == food.id,
        FoodMicronutrient.micronutrient_id == micro.id
    ).first()
    assert db_food_micro is not None
    assert db_food_micro.amount == 70.0

def test_get_food_micronutrients(db):
    """Test retrieving all micronutrients for a specific food."""
    # Create test food and micronutrients
    food = queries.add_food(db, name="Spinach", calories=23, protein=2.9, carbs=3.6, fat=0.4)
    micro1 = queries.add_micronutrient(db, name="Iron", unit="mg")
    micro2 = queries.add_micronutrient(db, name="Folate", unit="μg")
    
    # Add micronutrients to food
    queries.add_food_micronutrient(db, food.id, micro1.id, 2.7)
    queries.add_food_micronutrient(db, food.id, micro2.id, 194.0)
    
    # Retrieve the food's micronutrients
    food_micros = queries.get_food_micronutrients(db, food.id)
    
    # Verify micronutrients were retrieved
    assert food_micros is not None
    assert len(food_micros) == 2
    
    # Verify micronutrient details
    micro_amounts = [(fm.micronutrient_id, fm.amount) for fm in food_micros]
    assert (micro1.id, 2.7) in micro_amounts
    assert (micro2.id, 194.0) in micro_amounts

# UserMicroLog Tests
def test_log_user_micronutrient_consumption(db):
    """Test logging a user's micronutrient consumption."""
    # Create test user and micronutrient
    user = queries.add_user(db, username="microuser", email="micro@example.com", password_hash="micropass")
    micro = queries.add_micronutrient(db, name="Zinc", unit="mg")
    
    # Log micronutrient consumption
    micro_log = queries.log_user_micronutrient_consumption(
        db=db,
        user_id=user.id,
        micronutrient_id=micro.id,
        amount=11.0
    )
    
    # Check returned log
    assert micro_log is not None
    assert micro_log.id is not None
    assert micro_log.user_id == user.id
    assert micro_log.micronutrient_id == micro.id
    assert micro_log.amount == 11.0
    assert micro_log.timestamp is not None
    
    # Verify log exists in database
    db_log = db.query(UserMicroLog).filter(
        UserMicroLog.user_id == user.id,
        UserMicroLog.micronutrient_id == micro.id
    ).first()
    assert db_log is not None
    assert db_log.amount == 11.0

def test_get_user_micronutrient_logs(db):
    """Test retrieving all micronutrient logs for a specific user."""
    # Create test user and micronutrients
    user = queries.add_user(db, username="vitaminlover", email="vitamins@example.com", password_hash="vitpass")
    micro1 = queries.add_micronutrient(db, name="Vitamin B12", unit="μg")
    micro2 = queries.add_micronutrient(db, name="Magnesium", unit="mg")
    
    # Log micronutrient consumptions
    queries.log_user_micronutrient_consumption(db, user.id, micro1.id, 2.4)
    queries.log_user_micronutrient_consumption(db, user.id, micro2.id, 320.0)
    
    # Retrieve the user's micronutrient logs
    user_logs = queries.get_user_micronutrient_logs(db, user.id)
    
    # Verify logs were retrieved
    assert user_logs is not None
    assert len(user_logs) == 2
    
    # Verify log details
    log_micros = [(log.micronutrient_id, log.amount) for log in user_logs]
    assert (micro1.id, 2.4) in log_micros
    assert (micro2.id, 320.0) in log_micros

# FoodSource Tests
def test_add_food_source(db):
    """Test adding source information to a food item."""
    # Create test food
    food = queries.add_food(db, name="Salmon", calories=208, protein=20, carbs=0, fat=13)
    
    # Add source information
    source = queries.add_food_source(
        db=db,
        food_id=food.id,
        source_name="USDA",
        external_id="15076"
    )
    
    # Check returned source
    assert source is not None
    assert source.id is not None
    assert source.food_id == food.id
    assert source.source_name == "USDA"
    assert source.external_id == "15076"
    
    # Verify source exists in database
    db_source = db.query(FoodSource).filter(
        FoodSource.food_id == food.id,
        FoodSource.source_name == "USDA"
    ).first()
    assert db_source is not None
    assert db_source.external_id == "15076"

def test_get_food_sources(db):
    """Test retrieving all source information for a food item."""
    # Create test food
    food = queries.add_food(db, name="Beef Steak", calories=250, protein=26, carbs=0, fat=17)
    
    # Add multiple sources
    queries.add_food_source(db, food.id, "USDA", "13000")
    queries.add_food_source(db, food.id, "Custom", "STEAK-01")
    
    # Retrieve the food's sources
    food_sources = queries.get_food_sources(db, food.id)
    
    # Verify sources were retrieved
    assert food_sources is not None
    assert len(food_sources) == 2
    
    # Verify source details
    source_info = [(fs.source_name, fs.external_id) for fs in food_sources]
    assert ("USDA", "13000") in source_info
    assert ("Custom", "STEAK-01") in source_info

# Error Handling Tests
def test_error_handling_get_user_by_username(db, monkeypatch):
    """Test error handling in get_user_by_username function."""
    # Define a mock that raises an exception
    def mock_query_exception(*args, **kwargs):
        raise SQLAlchemyError("Database error")
    
    # Patch the query method
    monkeypatch.setattr(db, "query", mock_query_exception)
    
    # Call the function
    result = queries.get_user_by_username(db, "anyuser")
    
    # Verify None is returned on error
    assert result is None

def test_error_handling_add_food(db, monkeypatch):
    """Test error handling in add_food function."""
    # Define a mock that raises an exception when commit is called
    original_commit = db.commit
    
    def mock_commit_exception(*args, **kwargs):
        raise SQLAlchemyError("Commit error")
    
    # Patch the commit method
    monkeypatch.setattr(db, "commit", mock_commit_exception)
    
    # Call the function
    result = queries.add_food(db, name="ErrorFood", calories=100, protein=10, carbs=10, fat=10)
    
    # Verify None is returned on error
    assert result is None
    
    # Restore original commit method to avoid affecting other tests
    monkeypatch.setattr(db, "commit", original_commit)