/**
 * Generic interface for API requests
 */
export interface BookerooRequest {
    type: string;
}

/**
 * Generic interface for API responses
 */
export interface BookerooResponse {
    status: number;
    message: string;
    requestType: string;
}
