from __future__ import annotations

from datetime import datetime

from sqlmodel import Field

from .lib import DataModel
from ..utils import now


class User(DataModel):
    username: str = Field(unique=True, index=True)
    email: str = Field(unique=True, index=True)
    password_hash: str = Field()


class UserMacroLog(DataModel):
    quantity: float = Field()
    timestamp: datetime = Field(default_factory=now)

    user_id: int = Field(foreign_key="users.id", index=True)
    food_id: int = Field(foreign_key="foods.id", index=True)


class UserMicroLog(DataModel):
    amount: float = Field()
    timestamp: datetime = Field(default_factory=now)

    user_id: int = Field(foreign_key="users.id", index=True)
    micronutrient_id: int = Field(foreign_key="micronutrients.id", index=True)
