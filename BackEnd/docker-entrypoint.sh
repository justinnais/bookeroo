#!/bin/bash

cd book
mvn package -Dmaven.test.skip

cd ../listing
mvn package -Dmaven.test.skip

cd ../login
mvn package -Dmaven.test.skip

cd ../review
mvn package -Dmaven.test.skip

cd ../trans
mvn package -Dmaven.test.skip

cd ..
java -jar book/target/bookmicroservices-0.0.1.jar &
java -jar listing/target/listingmicroservice-0.0.1.jar &
java -jar login/target/loginmicroservices-0.0.1.jar &
java -jar review/target/reviewmicroservices-0.0.1.jar &
java -jar trans/target/transmicroservices-0.0.1.jar &
wait