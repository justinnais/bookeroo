import { UserRequests } from "./microservices/user";

type Request = UserRequests;

/**
 * Generic interface for API requests
 */
export interface BookerooRequest {
    type: Request;
}

/**
 * Generic interface for API responses
 * ? not sure if we need these details with Axios
 */
export interface BookerooResponse {
    status: number;
    message: string;
    requestType: Request;
}
