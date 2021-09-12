#!/bin/bash

cd /opt/codedeploy-agent/bookeroo/BackEnd/loginmicroservices &&
mvn clean && mvn package &&
docker build -t bookeroo/login-microservice . &&
docker run -d -p 8080:8080 bookeroo/login-microservice