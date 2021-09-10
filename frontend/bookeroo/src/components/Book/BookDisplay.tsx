import { makeStyles, Theme, createStyles } from "@material-ui/core";
import React from "react";
import BookCard, { IBookCard } from "./BookCard";

interface Props {
    books: IBookCard[];
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

    return (
        <div className={classes.root}>
            {props.books.map((book) => {
                return (
                    <BookCard
                        title={book.title}
                        author={book.author}
                        image={book.image}
                    />
                );
            })}
        </div>
    );
}
