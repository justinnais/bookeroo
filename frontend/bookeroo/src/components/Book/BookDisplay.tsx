import React from "react";
import BookCard, { IBookCard } from "./BookCard";

interface Props {
    books: IBookCard[];
}
export default function BookDisplay(props: Props) {
    return (
        <div>
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
