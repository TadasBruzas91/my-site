FROM node:16-bullseye AS build

COPY . /app
WORKDIR /app
RUN npm install
ENV REACT_APP_API_URL=https://tadascode.lt
RUN npm run build

FROM nginx:1.21.6-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT [ "nginx","-g","daemon off;" ]