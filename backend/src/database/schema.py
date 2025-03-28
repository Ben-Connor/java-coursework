from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime, timezone

from .base import DeclarativeBase


class User(DeclarativeBase):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password_hash = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.now(timezone.utc))   # To track when account age > 3 months for free trial

    macro_logs = relationship("UserMacroLog", back_populates="user", cascade="all, delete-orphan")
    micro_logs = relationship("UserMicroLog", back_populates="user", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<User(id={self.id}, username=\"{self.username}\", email=\"{self.email}\")>"

class Food(DeclarativeBase):
    __tablename__ = "foods"
    
    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True, nullable=False)
    calories = Column(Float, nullable=False)
    protein = Column(Float, nullable=False)
    carbs = Column(Float, nullable=False)
    fat = Column(Float, nullable=False)

    macro_logs = relationship("UserMacroLog", back_populates="food", cascade="all, delete-orphan")
    micronutrients = relationship("FoodMicronutrient", back_populates="food", cascade="all, delete-orphan")
    sources = relationship("FoodSource", back_populates="food", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Food(id={self.id}, name=\"{self.name}\", calories={self.calories})>"

class Micronutrient(DeclarativeBase):
    __tablename__ = "micronutrients"

    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True, nullable=False)
    unit = Column(String, nullable=False)

    foods = relationship("FoodMicronutrient", back_populates="micronutrient", cascade="all, delete-orphan")
    micro_logs = relationship("UserMicroLog", back_populates="micronutrient", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Micronutrient(id={self.id}, name=\"{self.name}\", unit=\"{self.unit}\")>"

class FoodMicronutrient(DeclarativeBase):
    __tablename__ = "food_micronutrients"

    id = Column(Integer, primary_key=True)
    food_id = Column(Integer, ForeignKey("foods.id", ondelete="CASCADE"), nullable=False)
    micronutrient_id = Column(Integer, ForeignKey("micronutrients.id", ondelete="CASCADE"), nullable=False)
    amount = Column(Float, nullable=False)   # Nutrient amount per standard serving
    
    food = relationship("Food", back_populates="micronutrients")
    micronutrient = relationship("Micronutrient", back_populates="foods")

    def __repr__(self):
        return f"<FoodMicronutrient(id={self.id}, food_id={self.food_id}, micronutrient_id={self.micronutrient_id}, amount={self.amount})>"

class UserMacroLog(DeclarativeBase):
    __tablename__ = "user_macro_log"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    food_id = Column(Integer, ForeignKey("foods.id", ondelete="CASCADE"), nullable=False)
    quantity = Column(Float, nullable=False)  # Amount consumed
    timestamp = Column(DateTime, default=datetime.now(timezone.utc))

    user = relationship("User", back_populates="macro_logs")
    food = relationship("Food", back_populates="macro_logs")

    def __repr__(self):
        return f"<UserMacroLog(id={self.id}, user_id={self.user_id}, food_id={self.food_id}, quantity={self.quantity}, timestamp={self.timestamp})>"

class UserMicroLog(DeclarativeBase):
    __tablename__ = "user_micro_log"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    micronutrient_id = Column(Integer, ForeignKey("micronutrients.id", ondelete="CASCADE"), nullable=False)
    amount = Column(Float, nullable=False)
    timestamp = Column(DateTime, default=datetime.now(timezone.utc))

    user = relationship("User", back_populates="micro_logs")
    micronutrient = relationship("Micronutrient", back_populates="micro_logs")

    def __repr__(self):
        return f"<UserMicroLog(id={self.id}, user_id={self.user_id}, micronutrient_id={self.micronutrient_id}, amount={self.amount}, timestamp={self.timestamp})>"

class FoodSource(DeclarativeBase):
    __tablename__ = "food_sources"

    id = Column(Integer, primary_key=True)
    food_id = Column(Integer, ForeignKey("foods.id", ondelete="CASCADE"), nullable=False)
    source_name = Column(String, nullable=False) 
    external_id = Column(String, nullable=False)   # Food ID in external database if obtainable
    
    food = relationship("Food", back_populates="sources")

    def __repr__(self):
        return f"<FoodSource(id={self.id}, food_id={self.food_id}, source_name=\"{self.source_name}\", external_id=\"{self.external_id}\")>"
