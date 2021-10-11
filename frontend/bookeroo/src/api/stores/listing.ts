// listing microservice store

import { api } from "../api";
import { CreateListingRequest } from "../models/Listing";

export function listListings() {
    return api.get("/listing");
}

// TODO implement in backend
export function getListing(id: number) {
    return api.get(`/listing/${id}`);
}

// TODO implement in backend
export function listBookListings(isbn: string) {
    return api.get(`/listing/list/${isbn}`); // todo change list to book
}

export function createListing(
    type: "swap" | "sell",
    listing: CreateListingRequest
) {
    return api.post(`/listing/create/${type}`, listing);
}
