import axios from "axios";

export const api = axios.create({
    baseURL: "https://bookeroo-api.danieljmills.com/api",
});

// local testing APIs
// TODO when production is ready, swap all api's in stores to api on line 5
export const apiLogin = axios.create({
    baseURL: "http://localhost:8080/api/user",
});

export const apiBook = axios.create({
    baseURL: "http://localhost:8081/api/book",
});

export const apiTrans = axios.create({
    baseURL: "http://localhost:8082/api/trans",
});

export const apiListing = axios.create({
    baseURL: "http://localhost:8084/api/listing",
});
