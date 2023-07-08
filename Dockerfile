FROM node:alpine
RUN apk update && apk add bash
WORKDIR /src
COPY package.json ./
COPY yarn.lock ./
COPY ./ ./
RUN yarn install
CMD yarn build; yarn start
