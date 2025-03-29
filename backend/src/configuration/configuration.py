from pydantic_settings import BaseSettings, SettingsConfigDict
from starlette.config import Config

from .lib.consts import Environment, ENVIRONMENT_FILE_LOOKUP
from .lib import get_environment


class Configuration(BaseSettings):
    ENVIRONMENT: Environment
    BACKEND_BASE_URL: str
    FRONTEND_BASE_URL: str
    DATABASE_URL: str

    def is_development(self) -> bool:
        return self.ENVIRONMENT == Environment.DEVELOPMENT

    def is_production(self) -> bool:
        return self.ENVIRONMENT == Environment.PRODUCTION
    
    def starlette_configuration(self) -> Config:
        return Config(environ=self.model_dump())

    model_config = SettingsConfigDict(env_file=ENVIRONMENT_FILE_LOOKUP[get_environment()], extra="ignore")


CONFIGURATION = Configuration()
