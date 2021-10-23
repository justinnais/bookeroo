export interface ITransaction {
    transactionId: number;
    buyerId: number;
    datetime: Date;
    status: string;
    listingId: number;
    price: number;
    captureId: string;
}

export interface ITransactionItem {
    listingId: number;
    transactionId: number;
    amount: number;
}
