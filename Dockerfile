FROM node:20-alpine AS build

COPY ./ .

RUN ["yarn"]
RUN ["yarn", "build"]

FROM nginx:1-alpine

COPY --from=build build /usr/share/nginx/html