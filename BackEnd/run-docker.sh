#!/bin/bash

boot () {
    #1 -> folder of microservice
    #2 -> docker container name
    #3 -> port

    id=`docker ps -aq --filter="ancestor=bookeroo/$2"`
    len=`expr "$id" : '.*'`
    
    if [ $len -gt 1 ]
    then
        echo "Killing $id, $2"
        docker rm `docker kill $id`
    fi

    cd $1/
    mvn clean package
    docker build -t bookeroo/$2 .
    docker run -d -p $3:8080 bookeroo/$2
    cd ..
}


service=$1
boot="NO"

if [[ "$service" == "login"] || "$service" == "all" ]]
then
    boot loginmicroservices login-microservice 8080
    boot="YES"
fi
if [[ "$service" == "book" ||  "$service" == "all" ]]
then
    boot bookmicroservices book-microservice 8081
    boot="YES"
fi
if [[ "$service" == "trans" ||  "$service" == "all" ]]
then
    boot transmicroservices transaction-microservice 8082
    boot="YES"
fi
if [[ "$service" == "list" ||  "$service" == "all" ]]
then
    boot listingmicroservice listing-microservice 8084
    boot="YES"
fi

if [[ "$boot" == "NO" ]]
then
    echo "Unknown service, try all, login, book, trans or list"
else
    echo "DONE!"
fi


