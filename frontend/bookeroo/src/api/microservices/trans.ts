import { BookerooRequest, BookerooResponse } from "../apiInterfaces";

export type TransRequests =
    | "trans/transaction";

export type TransPostRequest = CreateTransactionRequest;

export interface CreateTransactionRequest extends BookerooRequest {
    listing_price_map: Map<string, string>
    buyer_id: string;
}