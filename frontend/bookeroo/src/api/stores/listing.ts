// listing microservice store

import { api, apiListing } from "../api";
import { CreateListingRequest } from "../models/Listing";

export function listListings() {
    return apiListing.get("");
}

// TODO implement in backend
export function getListing(id: number) {
    return apiListing.get(`/${id}`);
}

// TODO implement in backend
export function listBookListings(isbn: string) {
    return apiListing.get(`/list/${isbn}`); // todo change list to book
}

export function createListing(
    type: "swap" | "sell",
    listing: CreateListingRequest
) {
    return apiListing.post(`/create/${type}`, listing);
}
