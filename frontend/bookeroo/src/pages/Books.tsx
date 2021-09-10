import React from "react";
import BookCard from "../components/Book/BookCard";
import BookDisplay from "../components/Book/BookDisplay";
import Container from "../components/Layout/Container";

export default function Books() {
    const books = [
        {
            title: "Harry Potter and the Philosopher's Stone",
            author: "J. K. Rowling.",
            image: "https://via.placeholder.com/200x200",
        },
        {
            title: "The Great Gatbsy",
            author: "F. Scott Fitzgerald",
            image: "https://via.placeholder.com/400x600",
        },
        {
            title: "Harry Potter and the Philosopher's Stone",
            author: "J. K. Rowling.",
            image: "https://via.placeholder.com/200x200",
        },
        {
            title: "The Great Gatbsy",
            author: "F. Scott Fitzgerald",
            image: "https://via.placeholder.com/400x600",
        },
        {
            title: "Harry Potter and the Philosopher's Stone",
            author: "J. K. Rowling.",
            image: "https://via.placeholder.com/200x200",
        },
        {
            title: "The Great Gatbsy",
            author: "F. Scott Fitzgerald",
            image: "https://via.placeholder.com/400x600",
        },
        {
            title: "Harry Potter and the Philosopher's Stone",
            author: "J. K. Rowling.",
            image: "https://via.placeholder.com/200x200",
        },
        {
            title: "The Great Gatbsy",
            author: "F. Scott Fitzgerald",
            image: "https://via.placeholder.com/400x600",
        },
        {
            title: "Harry Potter and the Philosopher's Stone",
            author: "J. K. Rowling.",
            image: "https://via.placeholder.com/200x200",
        },
        {
            title: "The Great Gatbsy",
            author: "F. Scott Fitzgerald",
            image: "https://via.placeholder.com/400x600",
        },
        {
            title: "Harry Potter and the Philosopher's Stone",
            author: "J. K. Rowling.",
            image: "https://via.placeholder.com/200x200",
        },
        {
            title: "The Great Gatbsy",
            author: "F. Scott Fitzgerald",
            image: "https://via.placeholder.com/400x600",
        },
    ];
    return (
        <Container>
            <BookDisplay books={books} />
        </Container>
    );
}
