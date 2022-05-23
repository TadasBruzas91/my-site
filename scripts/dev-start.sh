#!/bin/bash

cd front-end && npm i && npm run build && cd ..
co back-end && npm i && cd ..
cd react-dashboard && npm i && cd ..

docker-compose -f ./docker-compose.dev.yml up -d --build