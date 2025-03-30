FROM node:18-alpine


WORKDIR /app

ENV WDS_SOCKET_PORT=0

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
