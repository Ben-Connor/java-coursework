from enum import StrEnum

from ...configuration import CONFIGURATION


class RouterTag(StrEnum):
    META = "meta"
    USER = "user"
    FOOD_ENTRY = "food_entry"
    TARGET = "target"


API_APP_ENTRYPOINT = "src.api:app"
API_HOST = "0.0.0.0"
API_PORT = 8_000
API_PREFIX = "/api/v1"
ALL = "*"
API_ORIGINS = [
    CONFIGURATION.FRONTEND_BASE_URL
]
