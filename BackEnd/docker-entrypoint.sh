#!/bin/bash

cd ..
java -jar book.jar &
java -jar listing.jar &
java -jar login.jar &
java -jar review.jar &
java -jar trans.jar &
wait