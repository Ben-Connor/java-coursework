from __future__ import annotations

from sqlmodel import SQLModel

from pydantic import ConfigDict
from pydantic.alias_generators import to_camel


class APISchema(SQLModel):
    model_config = ConfigDict(  # type: ignore[assignment]
        alias_generator=to_camel,
        populate_by_name=True,
        from_attributes=True,
    )
