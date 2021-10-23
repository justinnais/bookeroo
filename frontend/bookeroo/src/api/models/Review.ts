export interface IReview {
    bookIsbn: string;
    reviewId: number;
    userId: number;
    score: number;
    review?: string;
}

export interface CreateReviewRequest extends Omit<IReview, "reviewId"> {}