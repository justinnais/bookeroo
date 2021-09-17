// listing microservice store

import { api, apiListing } from "../api";

export function listListings() {
    return apiListing.get("");
}

// TODO implement in backend
export function getListing(id: number) {
    return apiListing.get(`/${id}`);
}

// TODO implement in backend
export function listBookListings(isbn: string) {
    return apiListing.get(`/book/${isbn}`);
}
