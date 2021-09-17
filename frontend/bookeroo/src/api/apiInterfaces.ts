// TODO maybe delete file

// import { BookRequests } from "./microservices/book";
// import { TransRequests } from "./microservices/trans";
// import { UserRequests } from "./microservices/user";

// type Request = UserRequests | TransRequests | BookRequests;

/**
 * Generic interface for API requests
 */
// export interface BookerooRequest {
//     type: Request;
// }

/**
 * Generic interface for API responses
 * ? not sure if we need these details with Axios
 */
export interface BookerooResponse {
    status: number;
    message: string;
    // requestType: Request;
}
