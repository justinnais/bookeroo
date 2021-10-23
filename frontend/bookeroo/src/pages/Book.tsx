import { makeStyles, Theme, createStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { IBook } from "../api/models/Book";
import { useParams } from "react-router";
import { useQuery } from "react-query";
import BookTemplate from "../components/Book/BookTemplate";
import BookSkeleton from "../components/Book/BookSkeleton";
import { getBook } from "../api/stores/book";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        displayImage: {
            width: "100%",
            height: "auto",
        },
        icon: {
            fontSize: 100,
        },
        details: {
            background: theme.palette.common.white,
        },
    })
);

export default function Book() {
    const { isbn } = useParams<{ isbn: string }>();
    const { isLoading, data } = useQuery("getBook", () => getBook(isbn));

    let book: IBook = data ? data.data : undefined;
    if (data) {
        book = data.data;
        book.datePublished = data.data.date_published;
        // book.tableOfContents = data.data.table_of_contents; // ? this is not being passed through
    }

    // TODO fix skeleton
    return isLoading || !book ? <BookSkeleton /> : <BookTemplate book={book} />;
}
