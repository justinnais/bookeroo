// review microservice store

import { api } from "../api";
import { CreateReviewRequest, IReview } from "../models/Review";

export function listReviews() {
    return api.get("/review");
}

export function getReviewsForBook(isbn: string) {
    return api.get(`/review/book/${isbn}`);
}

export function getReviewsForUser(user: number) {
    return api.get(`/review/user/${user}`);
}

export function createReview(review: CreateReviewRequest) {
    return api.post(`/review/post`, review);
}