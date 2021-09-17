export type TransRequests = "trans/transaction";

export type TransPostRequest = CreateTransactionRequest;

export interface CreateTransactionRequest {
    listings: Array<Listing>;
    buyer_id: string;
}

// This probably belongs elsewhere, but I'm lost as it is
export interface Listing {
    listing_id: string;
    price: string;
}
