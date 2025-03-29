from enum import StrEnum
from pathlib import Path


class Environment(StrEnum):
    TEST = "test"
    DEVELOPMENT = "dev"
    PRODUCTION = "prod"


ENVIRONMENT_SPECIFICATION_VARIABLE_NAME = "ENVIRONMENT"
ENVIRONMENT_FILE_LOOKUP: dict[Environment, Path] = {
    Environment.TEST: Path("env/.env.test").resolve(),
    Environment.DEVELOPMENT: Path("env/.env.dev").resolve(),
    Environment.PRODUCTION: Path("env/.env.prod").resolve(),
}
