// book microservice store

import { api } from "../api";

export function listBooks() {
    return api.get("/book");
}

export function getBook(isbn: string) {
    return api.get(`/book/${isbn}`);
}
