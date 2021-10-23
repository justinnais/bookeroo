import { makeStyles, Theme, createStyles } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { IBook } from "../../api/models/Book";
import { listBooks } from "../../api/stores/book";
import BookCard from "./BookCard";

interface Props {
    count?: number;
    hideControls?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
        },
        display: {
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: theme.spacing(4),
        },
    })
);

/**
 *
 * @param props optional number of books to show per page, option to hide controls
 * @returns grid display of book cards
 */
export default function BookDisplay(props: Props) {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const booksPerPage = props.count || 8;
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    // load books through react query
    // TODO implement paginated queries https://react-query.tanstack.com/guides/paginated-queries
    const { isLoading, data } = useQuery("listBooks", listBooks);

    let books = data ? (data.data as IBook[]) : [];

    const slicedPages = books.slice(
        page * booksPerPage,
        page * booksPerPage + booksPerPage
    );
    const pageCount = Math.floor(books.length / booksPerPage);

    // if data is loading, create dummy books so loading skeleton works
    if (isLoading) {
        books = Array(booksPerPage).fill(undefined);
    }

    return (
        <div className={classes.root}>
            <div className={classes.display}>
                {slicedPages.map((book, key) => {
                    return (
                        <BookCard book={book} key={key} loading={isLoading} />
                    );
                })}
            </div>
            {!props.hideControls && (
                <Pagination
                    count={pageCount}
                    page={page}
                    onChange={handleChange}
                />
            )}
        </div>
    );
}
