import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useQuery } from "react-query";
import { listBooks } from "../api/stores/book";
import { IBook } from "../api/models/Book";
import { useHistory, useLocation } from "react-router";
import { Link as RouterLink } from "react-router-dom";
import Container from "../components/Layout/Container";
import { theme } from "../styles/theme";
import { createAuthorArray } from "../util/createAuthorArray";
import GenericTable from "../components/Table/GenericTable";
import { TableColumn } from "../components/Table/GenericTable";

const useStyles = makeStyles({
    root: {
        backgroundColor: theme.palette.primary.main,
    },
    table: {
        minWidth: 650,
    },
    tableRow: {
        textDecoration: "none",
    },
});

export function useSearchParams() {
    return new URLSearchParams(useLocation().search);
}

function filterResults(searchString: string | null, item: IBook) {
    if (searchString) {
        const search = searchString.toLowerCase();
        return Object.values(item).join(" ").toLowerCase().includes(search);
    } else {
        return true;
    }
}

export default function Search() {
    const classes = useStyles();
    const history = useHistory();
    const searchQuery = useSearchParams();

    const { isLoading, data, isError } = useQuery("listBooks", listBooks);
    const books = data ? (data.data as IBook[]) : [];
    const filteredBooks = books.filter((book) =>
        filterResults(searchQuery.get("q"), book)
    );

    const columns: TableColumn<IBook, keyof IBook>[] = [
        { key: "title" },
        { key: "authors" },
        { key: "publisher" },
        { key: "isbn", header: "ISBN" },
        { key: "pages" },
    ];

    const handleClick = (book: IBook) => {
        history.push(`/book/${book.isbn || book.isbn13}`);
    };

    return (
        <div className={classes.root}>
            <Container>
                <GenericTable
                    data={filteredBooks}
                    columns={columns}
                    onRowClick={handleClick}
                    isLoading={isLoading}
                    isError={isError}
                />
            </Container>
        </div>
    );
}
