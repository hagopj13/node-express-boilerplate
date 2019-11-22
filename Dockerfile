FROM node:12.13-alpine

RUN mkdir -p /usr/src/node-app

WORKDIR /usr/src/node-app

COPY package.json yarn.lock ./

RUN yarn install --pure-lockfile

COPY . .

EXPOSE 3000
