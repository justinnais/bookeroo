#!/bin/bash

len=`expr "$(docker ps -q)" : '.*'`

if [ $len -gt 1 ]; then
docker kill $(docker ps -q)
fi