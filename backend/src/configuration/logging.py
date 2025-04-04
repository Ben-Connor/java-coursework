from pathlib import Path

from loggle import LoggingConfiguration, Logger, LoggersSchema, LoggerName, FormatterName, AtomicHandlerName, CompositeHandlerName, StreamHandlerSchema, FileHandlerSchema, QueueHandlerSchema, FilterName, LoggingLevel, LoggingStream
from loggle.collections import Filters, Formatters, HandlerClasses, UvicornLoggerName, SQLAlchemyLoggerName

from ..configuration import CONFIGURATION


class AppFilterName(FilterName):
    ERROR = "error"


class AppFormatterName(FormatterName):
    STANDARD = "standard"
    JSON = "json"


class AppAtomicHandlerName(AtomicHandlerName):
    STANDARD = "standard"
    ERROR = "error"
    JSON_FILE = "json_file"


class AppCompositeHandlerName(CompositeHandlerName):
    QUEUE = "queue"


class AppLoggerName(LoggerName):
    COURSEWORK = "coursework-name"
    UVICORN = UvicornLoggerName.ROOT
    UVICORN_ACCESS = UvicornLoggerName.ACCESS
    UVICORN_ERROR = UvicornLoggerName.ERROR
    UVICORN_ASGI = UvicornLoggerName.ASGI
    SQLALCHEMY_ENGINE = SQLAlchemyLoggerName.ENGINE
    SQLALCHEMY_POOL = SQLAlchemyLoggerName.POOL
    SQLALCHEMY_DIALECTS = SQLAlchemyLoggerName.DIALECTS
    SQLALCHEMY_ORM = SQLAlchemyLoggerName.ORM


FILTERS = {
    AppFilterName.ERROR: Filters.ERROR,
}

FORMATTERS = {
    AppFormatterName.STANDARD: Formatters.STANDARD,
    AppFormatterName.JSON: Formatters.JSON,
}

HANDLERS = {
    AppAtomicHandlerName.STANDARD: StreamHandlerSchema(
        handler_class=HandlerClasses.STREAM,
        filters=[AppFilterName.ERROR],
        formatter=AppFormatterName.STANDARD,
        level=LoggingLevel.DEBUG,
        stream=LoggingStream.STANDARD_OUT,
    ),
    AppAtomicHandlerName.ERROR: StreamHandlerSchema(
        handler_class=HandlerClasses.STREAM,
        formatter=AppFormatterName.STANDARD,
        level=LoggingLevel.ERROR,
        stream=LoggingStream.STANDARD_ERROR,
    ),
    AppAtomicHandlerName.JSON_FILE: FileHandlerSchema(
        handler_class=HandlerClasses.JSON_FILE,
        formatter=AppFormatterName.JSON,
        level=LoggingLevel.DEBUG,
    ),
    AppCompositeHandlerName.QUEUE: QueueHandlerSchema(
        handler_class=HandlerClasses.QUEUE,
        handlers=list(AppAtomicHandlerName),
    ),
}

LOGGERS = (
    LoggersSchema[AppLoggerName, AppAtomicHandlerName | AppCompositeHandlerName]
    .from_json(Path(f"./logging/configuration/{CONFIGURATION.ENVIRONMENT}.json"))
)


LOGGING_CONFIGURATION = (
    LoggingConfiguration[AppFilterName, AppFormatterName, AppAtomicHandlerName, AppCompositeHandlerName, AppLoggerName].create(
        filters=FILTERS,
        formatters= FORMATTERS,
        handlers=HANDLERS,
        loggers=LOGGERS,
    )
)

LOGGER = Logger(name=AppLoggerName.COURSEWORK)
