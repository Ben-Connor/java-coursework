FROM node:18-alpine


WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --only=production
RUN npm install -g serve

COPY . .

EXPOSE 80

CMD ["npx", "serve", "dist"]
