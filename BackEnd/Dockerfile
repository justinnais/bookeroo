FROM openjdk:11
FROM maven:3.6.0-jdk-11 AS build

COPY bookmicroservices ./book
COPY listingmicroservice ./listing
COPY loginmicroservices ./login
COPY reviewmicroservices ./review
COPY transmicroservices ./trans
COPY docker-entrypoint.sh .

ENTRYPOINT ["./docker-entrypoint.sh"]