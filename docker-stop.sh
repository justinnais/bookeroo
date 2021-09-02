#!/bin/bash

len=`expr "$(docker ps -q)" : '.*'`

echo $len

if [ $len -gt 1 ]; then
docker kill $(docker ps -q)
fi