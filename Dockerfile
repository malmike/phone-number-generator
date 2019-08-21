FROM node:10-alpine AS builder

RUN npm install -g yarn

RUN mkdir -p /app/
WORKDIR /app/

COPY package.json yarn.lock /app/
RUN npm install

COPY . /app

EXPOSE 4200
CMD ["yarn", "start-docker"]