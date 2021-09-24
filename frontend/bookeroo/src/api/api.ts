import axios from "axios";
import storage from "../util/storage";

const token = storage.getToken();
if (token) {
    axios.defaults.headers["Authorization"] = `Bearer ${token}`;
}

export const api = axios.create({
    baseURL: "https://bookeroo-api.danieljmills.com/api",
});

// local testing APIs
// TODO when production is ready, swap all api's in stores to api on line 5
export const apiLogin = axios.create({
    baseURL: "http://localhost:8080/api/user",
});

apiLogin.interceptors.request.use((config) => {
    const token = storage.getToken();
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});

export const apiBook = axios.create({
    baseURL: "http://localhost:8081/api/book",
});

apiBook.interceptors.request.use((config) => {
    const token = storage.getToken();
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});

export const apiTrans = axios.create({
    baseURL: "http://localhost:8082/api/trans",
});

apiTrans.interceptors.request.use((config) => {
    const token = storage.getToken();
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});

export const apiListing = axios.create({
    baseURL: "http://localhost:8084/api/listing",
});

apiListing.interceptors.request.use((config) => {
    const token = storage.getToken();
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});
