export interface IListing {
    id: number;
    userId: number;
    bookIsbn: string;
    condition: string; // TODO add enum to this
    conditionDesc: string;
    price: string;
}

export interface CreateTransactionRequest {
    listings: Array<IListing>;
    buyer_id: string;
}
