#!/bin/bash

len=`expr "$(docker ps -q)" : '.*'`

echo $len

if [ $len -gt 1 ]; then
    touch $HOME/aaaaahhhhh.txt
    docker stop $(docker ps -q)
fi