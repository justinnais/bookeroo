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
import EnhancedTable from "../components/EnhancedTable";
import { TableColumn } from "../components/EnhancedTable";

const useStyles = makeStyles({
    root: {
        backgroundColor: theme.palette.primary.main,
        minHeight: "100vh",
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

    const { isLoading, data } = useQuery("listBooks", listBooks);
    const books = data ? (data.data as IBook[]) : [];
    const filteredBooks = books.filter((book) =>
        filterResults(searchQuery.get("q"), book)
    );

    const columns: TableColumn<IBook, keyof IBook>[] = [
        { key: "title" },
        { key: "authors" },
        { key: "publisher" },
        { key: "isbn", header: "ISBN" },
        { key: "pages", align: "right" },
    ];

    const handleClick = (book: IBook) => {
        console.log("click inside search", book);
        history.push(`/book/${book.isbn || book.isbn13}`);
    };

    // TODO fix styles later
    return (
        <EnhancedTable
            data={filteredBooks}
            columns={columns}
            onRowClick={handleClick}
        />
    );
    /* return (
        <Container className={classes.root}>
            <TableRow
                key={book.isbn}
                component={RouterLink}
                to={`/book/${book.isbn || book.isbn13}`}
                hover
                className={classes.tableRow}>
            </TableRow>
        </Container>
    ); */
}
