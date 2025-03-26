FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 3000

ENV WDS_SOCKET_PORT=0

CMD ["npm", "run", "dev"]
