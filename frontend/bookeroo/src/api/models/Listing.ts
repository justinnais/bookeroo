export interface IListing {
    id: number;
    userId: number;
    bookIsbn: string;
    isUsed: boolean;
    condition: string; // TODO add enum to this
    conditionDesc: string;
    price: string;
}

export interface CreateListingRequest {
    userId: number;
    bookIsbn: string;
    isUsed: boolean;
    condition: string;
    conditionDesc: string;
}

export interface CreateTransactionRequest {
    listings: Array<IListing>;
    buyer_id: string;
}
