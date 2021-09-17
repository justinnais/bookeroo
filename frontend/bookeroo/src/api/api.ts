import axios, { AxiosResponse } from "axios";

// const REST_URL = "https://bookeroo-api.danieljmills.com/api";

export const api = axios.create({
    baseURL: "https://bookeroo-api.danieljmills.com/api",
});

/**
 * Post API function
 * @param item Post Request item that is being sent to backend
 * @returns Axios response
 */
/* export async function post(item: PostRequest) {
    return await api.post(`/${item.type}`, item);
} */

/**
 * Get API function
 * @param item Get Request item that is being sent to backend
 * @returns Axios response
 */
/* export async function get(item: GetRequest): Promise<AxiosResponse> {
    // if the request type has an id, pass it through the request
    const id = "id" in item ? `/${item.id}` : "";
    return await api.get(`/${item.type}${id}`).then(
        (res) => res,
        (err) => err.response
    );
} */

// local testing APIs
// when production is ready, swap all api's in stores to api on line 5
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
