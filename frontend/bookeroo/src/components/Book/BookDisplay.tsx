import { makeStyles, Theme, createStyles } from "@material-ui/core";
import React from "react";
import { useQuery } from "react-query";
import { api } from "../../api/api";
import { IBook } from "../../api/models/Book";
import { listBooks } from "../../api/stores/book";
import BookCard from "./BookCard";

interface Props {
    count?: number;
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

    // load books through react query
    // TODO maybe factor out into store?
    const { isLoading, data } = useQuery("listBooks", listBooks);

    let books = data ? (data.data as IBook[]) : [];

    // if data is loading, create dummy books so loading skeleton works
    if (isLoading) {
        books = Array(props.count || 8).fill(undefined);
    }

    // if there is a number provided, show that number of books in the display
    if (props.count) {
        books = books.slice(0, props.count);
    }

    return (
        <div className={classes.root}>
            {books.map((book, key) => {
                return <BookCard book={book} key={key} loading={isLoading} />;
            })}
        </div>
    );
}
