import React from "react";
import { Rating } from "@material-ui/lab";
import { useAuthStore } from "../../stores/useAuthStore";
import { Theme } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/styles";
import { useQuery } from "react-query";
import { createBookReview, getReviewsForBook } from "../../api/stores/review";
import { CreateReviewRequest, IReview } from "../../api/models/Review";
import { useAlertStore } from "../../stores/useAlertStore";

interface Props {
    isbn: string;
    type: "book" | "user";
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        rating: {
            color: theme.palette.secondary.main,
        },
    })
);

export default function Star(props: Props) {
    const styles = useStyles();
    const isLoggedIn = useAuthStore((state) => state.isAuthenticated);
    const user = useAuthStore((state) => state.user);

    const setAlert = useAlertStore((state) => state.setAlert);
    const toast = (message: string) => {
        setAlert(message);
    };

    const { isLoading, isError, data, refetch } = useQuery(
        `getBookReviews-${props.isbn}`,
        () => getReviewsForBook(props.isbn)
    );

    if (isLoading || isError) {
        return (
            <Rating
                name="star-rating-error"
                className={styles.rating}
                readOnly={true}
                value={0}
            />
        );
    } else {
        const reviews = data ? data.data : [];
        const ratings: number[] = reviews.map(
            (review: IReview) => review.score
        );
        const aggregateScore =
            ratings.length > 0
                ? ratings.reduce((a, b) => a + b) / ratings.length
                : 0;

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
            // can be an object or string?

            // if (typeof error === "string") {
            //     toast(error);
            // } else {
            //     Object.values(error).map((error) => toast(error));
            // }
        };

        return (
            <Rating
                name="star-rating"
                className={styles.rating}
                value={aggregateScore}
                onChange={handleRating}
                readOnly={!isLoggedIn}
                precision={0.5}
            />
        );
    }
}
