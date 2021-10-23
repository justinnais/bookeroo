export interface IReview {
    bookIsbn?: string;
    otherUserId?: number;
    reviewId: number;
    userId: number;
    score: number;
    review?: string;
}

export interface CreateReviewRequest extends Omit<IReview, "reviewId"> {}