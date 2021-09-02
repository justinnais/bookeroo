#!/bin/bash

mvn clean && mvn package
docker build -t bookeroo/login-microservice .
docker run -p 8080:8080 bookeroo/login-microservice