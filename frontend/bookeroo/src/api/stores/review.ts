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

export function createBookReview(review: CreateReviewRequest) {
    return api.post(`/review/book/post`, review);
}
export function createUserReview(review: CreateReviewRequest) {
    return api.post(`/review/user/post`, review);
}