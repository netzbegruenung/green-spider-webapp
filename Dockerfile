FROM node:10-slim AS builder

WORKDIR /

ADD yarn.lock /
ADD package.json /
ADD src /src
ADD scripts /scripts
ADD public /public
ADD config /config

RUN yarn install
RUN yarn build

FROM nginx:1.14-alpine
COPY --from=builder /build /usr/share/nginx/html
