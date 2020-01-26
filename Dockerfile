FROM node:10-alpine AS builder
ENV NODE_ENV production
ENV CI true
WORKDIR /app

COPY package.json yarn.lock tsconfig.json /app/
RUN yarn install

COPY public /app/public
COPY src /app/src
ARG REACT_APP_APIURI=/api/v0
RUN yarn build

FROM nginx:1.16-alpine AS release

COPY --from=builder /app/build /usr/share/nginx/html
