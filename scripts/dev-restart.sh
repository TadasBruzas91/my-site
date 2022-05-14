#!/bin/bash

cd front-end && npm run build && cd ..
cd react-dashboard && npm run build && cd ..

docker-compose -f ./docker-compose.dev.yml restart