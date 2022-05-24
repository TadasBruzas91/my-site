FROM node:16-bullseye

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . /app
EXPOSE 80
CMD [ "node", "index.js" ]