#!/bin/bash

# Build and test each service
cd ./bookmicroservices
mvn package
cd ../listingmicroservice
mvn package
cd ../loginmicroservices
mvn package
cd ../reviewmicroservices
mvn package
cd ../transmicroservices
mvn package

# Build docker container
cd ..
docker build . -t bookeroo

# Run docker container
docker-compose up