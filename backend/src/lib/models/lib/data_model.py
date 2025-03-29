from __future__ import annotations

from sqlmodel import SQLModel, Field


class DataModel(SQLModel):
    id: int = Field(primary_key=True)
