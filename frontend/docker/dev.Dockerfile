FROM oven/bun:1.2-alpine


WORKDIR /app

COPY package.json bun.lock ./

RUN bun install --frozen-lockfile

COPY . .

COPY ./env/.env.dev ./.env

EXPOSE 3000

CMD ["bun", "run", "dev"]
