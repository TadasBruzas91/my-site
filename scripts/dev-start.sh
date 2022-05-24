#!/bin/bash

[ ! -d "front-end/node_modules" ] && cd front-end && npm i && npm run build && cd ..
[ ! -d "back-end/node_modules" ] && cd back-end && npm i && cd ..
[ ! -d "react-dashboard/node_modules" ] && cd react-dashboard && npm i && cd ..

docker-compose -f ./docker-compose.dev.yml up -d --build