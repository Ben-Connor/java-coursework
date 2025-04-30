FROM oven/bun:1.2-alpine AS build


WORKDIR /app

COPY package.json bun.lock ./

RUN bun install --frozen-lockfile

COPY . .

COPY ./env/.env.prod ./.env

RUN bun run build

# CMD ["tail", "-f", "/dev/null"]


FROM nginx:alpine AS serve

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
