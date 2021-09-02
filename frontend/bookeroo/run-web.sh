#!/bin/bash
cd /opt/codedeploy-agent/bookeroo/frontend/bookeroo &&
docker build -t bookeroo-frontend:latest . &&
docker run -d -p 80:80 bookeroo-frontend:latest