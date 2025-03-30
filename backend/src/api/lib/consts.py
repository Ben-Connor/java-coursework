from enum import StrEnum


class RouterTag(StrEnum):
    META = "meta"
    USER = "user"
    FOOD_ENTRY = "food_entry"


API_APP_ENTRYPOINT = "src.api:app"
API_HOST = "0.0.0.0"
API_PORT = 8_000
API_PREFIX = "/api/v1"
ALL = "*"
API_ORIGINS = [
    "http://localhost:3000",
    "localhost:3000",
]

SESSION_MIDDLEWARE_SAME_SITE_STRICT = "strict"
