#!/bin/bash

len=`expr "$(sudo docker ps -q)" : '.*'`

echo $len

if [ $len -gt 1 ]; then
docker kill $(sudo docker ps -q)
fi