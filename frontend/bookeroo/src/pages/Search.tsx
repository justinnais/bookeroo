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

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function useSearchParams() {
    return new URLSearchParams(useLocation().search);
}

function filterResults(searchString: string | null, item: IBook) {
    if (searchString) {
        const search = searchString.toLowerCase();
        return Object.values(item).join(" ").toLowerCase().includes(search);
        // console.log(search, item.title);

        // return item.title.includes(search);
    } else {
        return true;
    }
}

export default function Search() {
    const classes = useStyles();
    const searchQuery = useSearchParams();

    const { isLoading, data } = useQuery("listBooks", listBooks);
    let books = data ? (data.data as IBook[]) : [];

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell align="right">Author</TableCell>
                        <TableCell align="right">Publisher</TableCell>
                        <TableCell align="right">ISBN</TableCell>
                        <TableCell align="right">Page Count</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {books
                        .filter((book) =>
                            filterResults(searchQuery.get(""), book)
                        )
                        .map((book) => (
                            <TableRow
                                key={book.isbn}
                                component={RouterLink}
                                to={`/book/${book.isbn || book.isbn13}`}
                                hover
                            >
                                <TableCell component="th" scope="row">
                                    {book.title}
                                </TableCell>
                                <TableCell align="right">
                                    {book.authors}
                                </TableCell>
                                <TableCell align="right">
                                    {book.publisher}
                                </TableCell>
                                <TableCell align="right">{book.isbn}</TableCell>
                                <TableCell align="right">
                                    {book.pages}
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
