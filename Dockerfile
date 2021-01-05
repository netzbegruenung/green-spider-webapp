FROM node:12-slim AS builder

WORKDIR /

ADD yarn.lock /
ADD package.json /
ADD scripts /scripts

RUN yarn install

ADD config /config
ADD public /public
ADD src /src

RUN yarn build

FROM nginx:1.18-alpine

# move this file, as /etc/nginx/ will be masked by a volume
RUN cp /etc/nginx/mime.types /mime.types

COPY --from=builder /build /usr/share/nginx/html
