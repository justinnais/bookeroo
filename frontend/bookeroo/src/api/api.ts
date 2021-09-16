import axios, { AxiosResponse } from "axios";
import { BookerooResponse } from "./apiInterfaces";
import { BookGetRequest, BookGetResponse } from "./microservices/book";
import { TransPostRequest } from "./microservices/trans";
import {
    UserGetRequest,
    UserGetResponse,
    UserPostRequest,
    UserPostResponse,
} from "./microservices/user";

type PostRequest = UserPostRequest | TransPostRequest;
type PostResponse = UserPostResponse;
type GetRequest = UserGetRequest | BookGetRequest;
type GetResponse = UserGetResponse | BookGetResponse;

// const REST_URL = "https://bookeroo-api.danieljmills.com/api";

export const api = axios.create({
    baseURL: "http://localhost:8080/api",
});

/**
 * Post API function
 * @param item Post Request item that is being sent to backend
 * @returns Axios response
 */
export async function post(item: PostRequest) {
    return await api.post(`/${item.type}`, item);
}

/**
 * Get API function
 * @param item Get Request item that is being sent to backend
 * @returns Axios response
 */
export async function get(item: GetRequest): Promise<AxiosResponse> {
    // if the request type has an id, pass it through the request
    const id = "id" in item ? `/${item.id}` : "";
    return await api.get(`/${item.type}${id}`).then(
        (res) => res,
        (err) => err.response
    );

    /* try {
        const res_1 = await api.get(`/${item.type}${id}`);
        return res_1.data;
    } catch (error) {
        console.error(error);
    } */
    /*  try {
        return await axios.get(`${REST_URL}/${item.type}${id}`).then(
            (response) => ({
                data: response.data,
                status: response.status,
                statusText: response.statusText,
            }),
            (error) => ({
                error: error.response.data,
                status: error.response.status,
                statusText: error.response.statusText,
            })
        );
    } catch (error) {
        console.error(error);
        return error;
    }
    return await (
        await axios.get(`${REST_URL}/${item.type}${id}`)
    ).data; */
}
