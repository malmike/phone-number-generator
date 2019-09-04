FROM node:10-alpine AS builder

RUN npm install -g yarn
WORKDIR /usr/src/app/

COPY package*.json yarn.lock ./
RUN npm install

COPY . .
RUN npm run build-prod

FROM nginx:1.17.3-alpine

COPY --from=builder /usr/src/app/dist/phone-number-generator /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
