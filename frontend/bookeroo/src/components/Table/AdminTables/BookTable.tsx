import React from "react";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import { IBook } from "../../../api/models/Book";
import { listBooks } from "../../../api/stores/book";
import GenericTable, { TableColumn } from "../GenericTable";
import { createAuthorArray } from "../../../util/createAuthorArray";
import Button from "../../Button/Button";

export default function BookTable() {
    const history = useHistory();
    const { isLoading, isError, data, refetch } = useQuery(
        "listBooks",
        listBooks
    );

    const handleClick = (book: IBook) => {
        history.push(`/book/${book.isbn || book.isbn13}`);
    };

    const columns: TableColumn<IBook, keyof IBook>[] = [
        { key: "isbn", header: "ISBN" },
        { key: "title" },
        {
            key: "authors",
            dataTransform: (authors: string) =>
                createAuthorArray(authors).join(", "),
        },
        { key: "publisher" },
        { key: "pages" },
        {
            key: "custom",
            header: " ",
            customComponent: (book: IBook) => <Button>Edit</Button>, // TODO add functionality
        },
    ];
    return (
        <GenericTable
            data={data}
            columns={columns}
            onRowClick={handleClick}
            isLoading={isLoading}
            isError={isError}
            printButton
        />
    );
}
