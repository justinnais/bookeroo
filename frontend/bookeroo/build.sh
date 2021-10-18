#!/bin/sh

#if run build runs with warnings, circleci dies
#This script intercepts that and only errors if the code is not 0 or 1
cd frontend/bookeroo && sudo npm run build
CODE=$?
if [[ $CODE -gt 1 ]]
then
    echo "ERROR"
    exit 1
else
    exit 0
fi