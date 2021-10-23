import React from "react";
import { useQuery } from "react-query";
import { CreateReviewRequest, IReview } from "../../api/models/Review";
import { createBookReview, getReviewsForBook } from "../../api/stores/review";
import { useAlertStore } from "../../stores/useAlertStore";
import { useAuthStore } from "../../stores/useAuthStore";
import Star from "./Star";

interface Props {
    isbn: string;
}

export default function BookRatings(props: Props) {
    const isLoggedIn = useAuthStore((state) => state.isAuthenticated);
    const user = useAuthStore((state) => state.user);
    const setAlert = useAlertStore((state) => state.setAlert);
    const toast = (message: string) => setAlert(message);
    const { isLoading, isError, data, refetch } = useQuery(
        `getBookReviews-${props.isbn}`,
        () => getReviewsForBook(props.isbn)
    );

    if (isLoading || isError) {
        return <Star ratings={[]} readOnly />;
    } else {
        const reviews = data ? data.data : [];
        const ratings: number[] = reviews.map(
            (review: IReview) => review.score
        );

        const handleRating = (
            event: React.ChangeEvent<{}>,
            value: number | null
        ) => {
            if (isLoggedIn) {
                const review: CreateReviewRequest = {
                    bookIsbn: props.isbn,
                    userId: user!.id,
                    score: value || 0,
                    review: "wow", // TODO fix
                };

                createBookReview(review).then(
                    (res) => handleResponse(res, review),
                    (err) => handleError(err)
                );
            }
        };

        const handleResponse = (res: any, review: CreateReviewRequest) => {
            if (res.status === 201) {
                toast(`Thanks for leaving a review!`);
                refetch();
            }
        };

        const handleError = (err: any) => {
            try {
                if (err.toString().includes("409")) {
                    toast("You have already left a review!");
                } else toast(`${err}`);
            } catch (error) {
                console.error(error);
            }
        };

        return <Star ratings={ratings} handleRating={handleRating} />;
    }
}
