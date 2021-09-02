#!/bin/bash

cd /otp/codedeploy-agent/bookeroo/BackEnd/loginmicroservices &&
mvn clean && mvn package &&
docker login &&
docker build -t bookeroo/login-microservice . &&
docker run -p 8080:8080 bookeroo/login-microservice