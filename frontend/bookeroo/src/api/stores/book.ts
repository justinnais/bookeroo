// book microservice store

import { api, apiBook } from "../api";

export function listBooks() {
    return apiBook.get("");
}

export function getBook(isbn: string) {
    return apiBook.get(`/${isbn}`);
}

// TODO search api
