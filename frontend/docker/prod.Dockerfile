FROM oven/bun:1.2-alpine AS build


WORKDIR /app

COPY package.json bun.lock ./

RUN bun install --production --frozen-lockfile

COPY . .

RUN bun run build


FROM nginx:alpine AS serve


COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
