FROM node:18-alpine


WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --only=production

COPY . .

EXPOSE 80

CMD ["npx", "serve", "dist", "--port", "80"]
