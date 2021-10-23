// listing microservice store

import { api } from "../api";
import { CreateListingRequest } from "../models/Listing";

export function listListings() {
    return api.get("/listing");
}

export function getListing(id: number) {
    return api.get(`/listing/${id}`);
}

export function listBookListings(isbn: string) {
    return api.get(`/listing/book/${isbn}`);
}

export function createListing(
    type: "swap" | "sell",
    listing: CreateListingRequest
) {
    return api.post(`/listing/create`, listing);
}