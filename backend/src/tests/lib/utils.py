from typing import Any

from ...lib.models.lib.database_model import DatabaseModel


def without[K, V](dictionary: dict[K, V], *keys: K) -> dict[K, V]:
    dictionary_copy = dictionary.copy()
    for key in keys:
        dictionary_copy.pop(key, None)
    return dictionary_copy


def dump_database_model(table: DatabaseModel | None) -> dict[str, Any] | None:
    if table is None:
        return None
    return table.model_dump()
