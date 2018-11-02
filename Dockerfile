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

# move this file, as /etc/nginx/ will be masked by a volume
RUN COPY /etc/nginx/mime.types /mime.types

COPY --from=builder /build /usr/share/nginx/html
