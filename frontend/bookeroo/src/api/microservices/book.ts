// import { BookerooRequest, BookerooResponse } from "../apiInterfaces";
import { IBook } from "../models/Book";

export type BookRequests = "book" | "book/search/title";
export type BookGetRequest = GetBookRequest | ListBookRequest;
export type BookGetResponse = GetBookResponse | ListBookResponse;

interface GetBookRequest {
    isbn: string;
}

interface GetBookResponse {
    book: IBook;
}

export interface ListBookRequest {}

export interface ListBookResponse {
    books: IBook[];
}
