import { makeStyles, Theme, createStyles } from "@material-ui/core";
import React from "react";
import { IBook } from "../../api/models/Book";
import BookCard from "./BookCard";

interface Props {
    books: IBook[];
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: theme.spacing(4),
            justifyContent: "center",
        },
    })
);
export default function BookDisplay(props: Props) {
    const classes = useStyles();

    if (props.books.length === 0) {
        return <div>No books :(</div>;
    }

    return (
        <div className={classes.root}>
            {props.books.map((book) => {
                return <BookCard {...book} />;
            })}
        </div>
    );
}
