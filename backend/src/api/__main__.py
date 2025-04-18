from uvicorn import run

from .lib.consts import API_PORT, API_HOST, API_APP_ENTRYPOINT
from ..configuration import CONFIGURATION, LOGGING_CONFIGURATION


def main() -> None:
    run(
        API_APP_ENTRYPOINT,
        host=API_HOST,
        port=API_PORT,
        reload=CONFIGURATION.is_development(),
        log_config=LOGGING_CONFIGURATION.to_configuration_dictionary(),
    )


if __name__ == "__main__":
    main()
