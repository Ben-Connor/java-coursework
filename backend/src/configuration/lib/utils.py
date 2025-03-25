from os import environ
from functools import lru_cache

from .consts import Environment, ENVIRONMENT_SPECIFICATION_VARIABLE_NAME


@lru_cache()
def get_environment() -> Environment:
    raw = environ.get(ENVIRONMENT_SPECIFICATION_VARIABLE_NAME)
    if raw is None:
        raise ValueError("Missing environment specification.")
    try:
        return Environment(raw)
    except ValueError:
        raise ValueError("Invalid environment specification.")
