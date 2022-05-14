#!/bin/bash

# Build front-end
cd front-end && npm i && npm run build && cd ..

docker-compose -f ./docker-compose.dev.yml up -d --build