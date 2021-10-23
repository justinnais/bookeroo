import React from "react";
import { Rating } from "@material-ui/lab";
import { useAuthStore } from "../../stores/useAuthStore";
import { Theme } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/styles";

interface Props {
    ratings: number[];
    handleRating?: (event: React.ChangeEvent<{}>, value: number | null) => void;
    readOnly?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        rating: {
            color: theme.palette.secondary.main,
        },
    })
);

/**
 * Star ratings
 * @param props rating value, callback when clicked
 * @returns star display
 */
export default function Star(props: Props) {
    const styles = useStyles();
    const isLoggedIn = useAuthStore((state) => state.isAuthenticated);

    const { ratings } = props;
    const aggregateScore =
        ratings.length > 0
            ? ratings.reduce((a, b) => a + b) / ratings.length
            : 0;
    const readOnly: boolean = props.readOnly || !isLoggedIn;
    return (
        <Rating
            name="star-rating"
            className={styles.rating}
            value={aggregateScore}
            onChange={props.handleRating}
            readOnly={readOnly}
            precision={0.5}
        />
    );
}
