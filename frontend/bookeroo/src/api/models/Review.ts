export interface IReview {
    bookIsbn?: string;
    reviewedUserId?: number;
    reviewId: number;
    userId: number;
    score: number;
    review?: string;
}

export interface CreateReviewRequest extends Omit<IReview, "reviewId"> {}
export interface CreateUserReviewRequest
    extends Omit<IReview, "reviewId" | "userId"> {
    reviewerUserId: number;
}