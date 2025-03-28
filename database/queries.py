from datetime import timezone, datetime
from typing import Optional, List

from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError

from schema import User, Food, UserMacroLog, UserMicroLog, FoodMicronutrient, Micronutrient, FoodSource

def add_user(db: Session, username: str, email: str, password_hash: str) -> Optional[User]:
    """
    Add a new user to the database.
    
    Args:
        db (Session): Database session
        username (str): User's username
        email (str): User's email address
        password_hash (str): Hashed password
    
    Returns:
        User object if successful, None otherwise
    """
    try:
        db_user = User(username=username, email=email, password_hash=password_hash)
        db.add(db_user)
        db.commit() 
        db.refresh(db_user) 
        return db_user
    except SQLAlchemyError as e:
        db.rollback()  
        print(f"Error adding user: {e}")
        return None

def get_user_by_username(db: Session, username: str) -> Optional[User]:
    """
    Retrieve a user by their username.
    
    Args:
        db (Session): Database session
        username (str): Username to search for
    
    Returns:
        User object if found, None otherwise
    """
    try:
        return db.query(User).filter(User.username == username).first()
    except SQLAlchemyError as e:
        print(f"Error fetching user by username: {e}")
        return None

def get_all_users(db: Session) -> Optional[List[User]]:
    """
    Retrieve all users from the database.
    
    Args:
        db (Session): Database session
    
    Returns:
        List of User objects if successful, None otherwise
    """
    try:
        return db.query(User).all()
    except SQLAlchemyError as e:
        print(f"Error fetching all users: {e}")
        return None

def add_food(db: Session, name: str, calories: float, protein: float, carbs: float, fat: float) -> Optional[Food]:
    """
    Add a new food item to the database.
    
    Args:
        db (Session): Database session
        name (str): Name of the food
        calories (float): Calorie content
        protein (float): Protein content
        carbs (float): Carbohydrate content
        fat (float): Fat content
    
    Returns:
        Food object if successful, None otherwise
    """
    try:
        db_food = Food(name=name, calories=calories, protein=protein, carbs=carbs, fat=fat)
        db.add(db_food)
        db.commit()
        db.refresh(db_food)
        return db_food
    except SQLAlchemyError as e:
        db.rollback()
        print(f"Error adding food: {e}")
        return None

def get_food_by_name(db: Session, name: str) -> Optional[Food]:
    """
    Retrieve a food item by its name.
    
    Args:
        db (Session): Database session
        name (str): Name of the food to search for
    
    Returns:
        Food object if found, None otherwise
    """
    try:
        return db.query(Food).filter(Food.name == name).first()
    except SQLAlchemyError as e:
        print(f"Error fetching food by name: {e}")
        return None

def log_user_food(db: Session, user_id: int, food_id: int, quantity: float) -> Optional[UserMacroLog]:
    """
    Log a food item consumed by a user.
    
    Args:
        db (Session): Database session
        user_id (int): ID of the user
        food_id (int): ID of the food item
        quantity (float): Quantity of the food consumed
    
    Returns:
        UserMacroLog object if successful, None otherwise
    """
    try:
        db_log = UserMacroLog(user_id=user_id, food_id=food_id, quantity=quantity)
        db.add(db_log)
        db.commit()
        db.refresh(db_log)
        return db_log
    except SQLAlchemyError as e:
        db.rollback()
        print(f"Error logging user food: {e}")
        return None

def get_user_food_logs(db: Session, user_id: int) -> Optional[List[UserMacroLog]]:
    """
    Retrieve all food logs for a specific user.
    
    Args:
        db (Session): Database session
        user_id (int): ID of the user
    
    Returns:
        List of UserMacroLog objects if successful, None otherwise
    """
    try:
        return db.query(UserMacroLog).filter(UserMacroLog.user_id == user_id).all()
    except SQLAlchemyError as e:
        print(f"Error fetching user food logs: {e}")
        return None

def add_micronutrient(db: Session, name: str, unit: str) -> Optional[Micronutrient]:
    """
    Get an existing micronutrient by name or create it if it doesn't exist.
    
    Args:
        db (Session): Database session
        name (str): Name of the micronutrient
        unit (str): Unit of measurement
    
    Returns:
        Micronutrient object if successful, None otherwise
    """
    try:
        # Check if the micronutrient already exists
        existing = db.query(Micronutrient).filter(Micronutrient.name == name).first()
        if existing:
            return existing
        
        # Create new micronutrient if it doesn't exist
        db_micronutrient = Micronutrient(name=name, unit=unit)
        db.add(db_micronutrient)
        db.commit()
        db.refresh(db_micronutrient)
        return db_micronutrient
    except SQLAlchemyError as e:
        db.rollback()
        print(f"Error getting or creating micronutrient: {e}")
        return None

def get_micronutrient_by_name(db: Session, name: str) -> Optional[Micronutrient]:
    """
    Retrieve a micronutrient by its name.
    
    Args:
        db (Session): Database session
        name (str): Name of the micronutrient to search for
    
    Returns:
        Micronutrient object if found, None otherwise
    """
    try:
        return db.query(Micronutrient).filter(Micronutrient.name == name).first()
    except SQLAlchemyError as e:
        print(f"Error fetching micronutrient by name: {e}")
        return None

def add_food_micronutrient(db: Session, food_id: int, micronutrient_id: int, amount: float) -> Optional[FoodMicronutrient]:
    """
    Get an existing micronutrient or create it if it doesn't exist.
    
    Args:
        db (Session): Database session
        name (str): Name of the micronutrient
        unit (str): Unit of measurement
    
    Returns:
        Micronutrient object if successful, None otherwise
    """
    try:
        # Check if micronutrient already exists
        existing = db.query(FoodMicronutrient).filter(FoodMicronutrient.micronutrient_id == micronutrient_id).first()
        if existing:
            return existing
        
        # Create new micronutrient if it doesn't exist
        db_food_micronutrient = FoodMicronutrient(food_id=food_id, micronutrient_id=micronutrient_id, amount=amount)
        db.add(db_food_micronutrient)
        db.commit()
        db.refresh(db_food_micronutrient)
        return db_food_micronutrient
    except SQLAlchemyError as e:
        db.rollback()
        print(f"Error getting or creating micronutrient: {e}")
        return None

def get_food_micronutrients(db: Session, food_id: int) -> Optional[List[FoodMicronutrient]]:
    """
    Retrieve all micronutrients of a specific food.
    
    Args:
        db (Session): Database session
        food_id (int): ID of the food
    
    Returns:
        List of FoodMicronutrient objects if successful, None otherwise
    """
    try:
        return db.query(FoodMicronutrient).filter(FoodMicronutrient.food_id == food_id).all()
    except SQLAlchemyError as e:
        print(f"Error fetching food micronutrients: {e}")
        return None

def log_user_micronutrient_consumption(db: Session, user_id: int, micronutrient_id: int, amount: float) -> Optional[UserMicroLog]:
    """
    Log a user's micronutrient consumption.
    
    Args:
        db (Session): Database session
        user_id (int): ID of the user
        micronutrient_id (int): ID of the micronutrient
        amount (float): Amount of micronutrient consumed
    
    Returns:
        UserMicroLog object if successful, None otherwise
    """
    try:
        micronutrient_log = UserMicroLog(
            user_id=user_id,
            micronutrient_id=micronutrient_id,
            amount=amount,
            timestamp = datetime.now(timezone.utc)
        )
        db.add(micronutrient_log)
        db.commit()
        db.refresh(micronutrient_log)
        return micronutrient_log
    except SQLAlchemyError as e:
        db.rollback()
        print(f"Error logging micronutrient consumption: {e}")
        return None

def get_user_micronutrient_logs(db: Session, user_id: int) -> Optional[List[UserMicroLog]]:
    """
    Fetch the micronutrient logs for a user.
    
    Args:
        db (Session): Database session
        user_id (int): ID of the user
    
    Returns:
        List of UserMicroLog objects if successful, None otherwise
    """
    try:
        return db.query(UserMicroLog).filter(UserMicroLog.user_id == user_id).all()
    except SQLAlchemyError as e:
        print(f"Error fetching user micronutrient logs: {e}")
        return None

def add_food_source(db: Session, food_id: int, source_name: str, external_id: str) -> Optional[FoodSource]:
    """
    Add source information to a food item.
    
    Args:
        db (Session): Database session
        food_id (int): ID of the food
        source_name (str): Name of the source database
        external_id (str): ID in the external database
    
    Returns:
        FoodSource object if successful, None otherwise
    """
    try:
        food_source = FoodSource(
            food_id=food_id,
            source_name=source_name,
            external_id=external_id
        )
        db.add(food_source)
        db.commit()
        db.refresh(food_source)
        return food_source
    except SQLAlchemyError as e:
        db.rollback()
        print(f"Error adding food source: {e}")
        return None

def get_food_sources(db: Session, food_id: int) -> Optional[List[FoodSource]]:
    """
    Retrieve all source information for a food item.
    
    Args:
        db (Session): Database session
        food_id (int): ID of the food
    
    Returns:
        List of FoodSource objects if successful, None otherwise
    """
    try:
        return db.query(FoodSource).filter(FoodSource.food_id == food_id).all()
    except SQLAlchemyError as e:
        print(f"Error fetching food sources: {e}")
        return None