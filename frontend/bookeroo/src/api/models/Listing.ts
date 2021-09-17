export interface Listing {
    listing_id: string;
    price: string;
}

export interface CreateTransactionRequest {
    listings: Array<Listing>;
    buyer_id: string;
}
