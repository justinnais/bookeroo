#!/bin/bash
mvn clean && mvn package
docker build -t bookeroo/login-microservice .

