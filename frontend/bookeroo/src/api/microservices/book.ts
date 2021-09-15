import { BookerooRequest, BookerooResponse } from "../apiInterfaces";
import { IBook } from "../models/Book";

export type BookRequests = "books" | "books/all" | "books/search/title";
export type BookGetRequest = GetBookRequest | ListBookRequest;
export type BookGetResponse = GetBookResponse | ListBookResponse;

interface GetBookRequest extends BookerooRequest {
    isbn: string;
}

interface GetBookResponse extends BookerooResponse {
    book: IBook;
}

export interface ListBookRequest extends BookerooRequest {}

interface ListBookResponse extends BookerooResponse {
    books: IBook[];
}
