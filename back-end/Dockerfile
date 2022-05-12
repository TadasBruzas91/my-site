FROM node:16-bullseye

COPY . /app
WORKDIR /app
RUN npm install
EXPOSE 80
CMD [ "node", "index.js" ]