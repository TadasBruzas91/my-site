FROM node:16.14.2-alpine3.14 AS build-stage

RUN mkdir /app
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM nginx:alpine
COPY --from=build-stage /app/dist /usr/share/nginx/html
# COPY ./src/config/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
ENTRYPOINT [ "nginx","-g","daemon off;" ]