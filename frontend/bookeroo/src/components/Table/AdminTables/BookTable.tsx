import React from "react";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import { IBook } from "../../../api/models/Book";
import { listBooks } from "../../../api/stores/book";
import GenericTable, { TableColumn } from "../GenericTable";
import { createAuthorArray } from "../../../util/createAuthorArray";

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
    ];
    return (
        <GenericTable
            data={data}
            columns={columns}
            onRowClick={handleClick}
            isLoading={isLoading}
        />
    );
}
