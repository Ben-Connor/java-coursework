from typing import TYPE_CHECKING

from sqlmodel import Relationship

from .lib import DatabaseTable
from ...lib.models import (
    UserModel,
    UserMacroLogModel,
    UserMicroLogModel,
)

if TYPE_CHECKING:
    from .food import Food, Micronutrient


class User(UserModel, DatabaseTable, table=True):
    __tablename__ = "users"

    macro_logs: list["UserMacroLog"] = Relationship(back_populates="user")
    micro_logs: list["UserMicroLog"] = Relationship(back_populates="user")


class UserMacroLog(UserMacroLogModel, DatabaseTable, table=True):
    __tablename__ = "user_macro_logs"

    user: "User" = Relationship(back_populates="macro_logs")
    food: "Food" = Relationship(back_populates="macro_logs")


class UserMicroLog(UserMicroLogModel, DatabaseTable, table=True):
    __tablename__ = "user_micro_logs"

    user: "User" = Relationship(back_populates="micro_logs")
    micronutrient: "Micronutrient" = Relationship(back_populates="micro_logs")
