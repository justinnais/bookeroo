FROM openjdk:11
FROM maven:3.6.0-jdk-11 AS build

COPY bookmicroservices/target/bookmicroservices-0.0.1.jar ./book.jar
COPY listingmicroservice/target/listingmicroservice-0.0.1.jar ./listing.jar
COPY loginmicroservices/target/loginmicroservices-0.0.1.jar ./login.jar
COPY reviewmicroservices/target/reviewmicroservices-0.0.1.jar ./review.jar
COPY transmicroservices/target/transmicroservices-0.0.1.jar ./trans.jar
COPY docker-entrypoint.sh .

ENTRYPOINT ["./docker-entrypoint.sh"]