#!/bin/bash
./mvnw clean && ./mvnw package
docker build -t bookeroo/login-microservice .

