from __future__ import annotations

from datetime import datetime

from sqlalchemy.sql import func
from sqlmodel import Field

from ....lib.models.lib import DataModel


class DatabaseTable(DataModel):
    created_at: datetime = Field(sa_column_kwargs={"server_default": func.now()})
    updated_at: datetime = Field(sa_column_kwargs={"server_default": func.now(), "server_onupdate": func.now()})
