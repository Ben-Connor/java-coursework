from enum import StrEnum
from pathlib import Path


class Environment(StrEnum):
    DEVELOPMENT = "dev"
    PRODUCTION = "prod"


ENVIRONMENT_SPECIFICATION_VARIABLE_NAME = "ENVIRONMENT"
ENVIRONMENT_FILE_LOOKUP: dict[Environment, Path] = {
    Environment.DEVELOPMENT: Path("env/.env.dev").resolve(),
    Environment.PRODUCTION: Path("env/.env.prod").resolve(),
}
