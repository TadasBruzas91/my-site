FROM node:16-bullseye AS build

COPY . /app
WORKDIR /app
RUN npm install
RUN npm run build

FROM nginx:1.21.6-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT [ "nginx","-g","daemon off;" ]