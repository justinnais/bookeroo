export interface ITransaction {
    id: number;
    buyerId: number;
    datetime: Date;
}

export interface ITransactionItem {
    listingId: number;
    transactionId: number;
    amount: number;
}
