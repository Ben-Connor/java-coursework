from typing import Sequence

from sqlalchemy import Engine
from sqlmodel import Table
from ....lib.models.lib import DatabaseModel


def create_tables(engine: Engine, tables: Sequence[Table] | None = None, checkfirst: bool = True) -> None:
    DatabaseModel.metadata.create_all(engine, tables=tables, checkfirst=checkfirst)


def drop_tables(engine: Engine, tables: Sequence[Table] | None = None, checkfirst: bool = True) -> None:
    DatabaseModel.metadata.drop_all(engine, tables=tables, checkfirst=checkfirst)
