FROM node:21-alpine3.19

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 4001