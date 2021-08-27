import axios from "axios";
import {
    UserGetRequest,
    UserGetResponse,
    UserPostRequest,
    UserPostResponse,
} from "./microservices/user";

type PostRequest = UserPostRequest;
type PostResponse = UserPostResponse;
type GetRequest = UserGetRequest;
type GetResponse = UserGetResponse;

const REST_URL = "http://bookeroo-api.danieljmills.com/api/";

/**
 * Post API function
 * @param item Post Request item that is being sent to backend
 * @returns Axios response
 */
export async function post(item: PostRequest) {
    return await axios.post(`${REST_URL}/${item.type}`, item);
}

/**
 * Get API function
 * @param item Get Request item that is being sent to backend
 * @returns Axios response
 */
export async function get(item: GetRequest) {
    // if the request type has an id, pass it through the request
    const id = "id" in item ? item.id : undefined;
    return await axios.get(`${REST_URL}/${item.type}/${id}`);
}
