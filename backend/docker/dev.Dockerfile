FROM python:3.13-slim AS base


WORKDIR /app

RUN apt-get update && \
    apt-get install -y curl && \
    curl -sSL https://install.python-poetry.org | python3 - && \
    ln -s /root/.local/bin/poetry /usr/local/bin/poetry

ENV PATH="$PATH:/root/.local/bin"
ENV ENVIRONMENT="dev"

COPY ../pyproject.toml ../poetry.lock /app/

RUN poetry config virtualenvs.create false && \
    poetry install --no-interaction --no-ansi --without dev

COPY ../src /app/src/
COPY ../env /app/env/
COPY ../logging/configuration /app/logging/configuration/
RUN mkdir /app/logging/logs && touch /app/logging/logs/log.jsonl

CMD ["poetry", "run", "python", "-m", "src.api"]
