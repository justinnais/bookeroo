#!/bin/bash
npm run build
CODE=$?
if [[ $CODE -gt 1 ]]
then
    echo "ERROR"
    exit 1
else
    exit 0
fi