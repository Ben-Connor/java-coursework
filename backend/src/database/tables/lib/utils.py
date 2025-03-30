from typing import Sequence

from sqlalchemy import Engine
from sqlmodel import Table
from .database_table import DatabaseTable


def create_tables(engine: Engine, tables: Sequence[Table] | None = None, checkfirst: bool = True):
    return DatabaseTable.metadata.create_all(engine, tables=tables, checkfirst=checkfirst)


def drop_tables(engine: Engine, tables: Sequence[Table] | None = None, checkfirst: bool = True):
    return DatabaseTable.metadata.drop_all(engine, tables=tables, checkfirst=checkfirst)
