FROM node:20-alpine AS build

COPY ./ .

RUN ["yarn"]
RUN ["yarn", "build"]

FROM nginx:1-alpine

RUN apk add --no-cache npm

RUN echo "npx react-inject-env set -d /usr/share/nginx/html" > /docker-entrypoint.d/set_env.sh && chmod +x /docker-entrypoint.d/set_env.sh 

EXPOSE 80
COPY deployment/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build build /usr/share/nginx/html
