import React from "react";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import { useAlertStore } from "../../../stores/useAlertStore";
import GenericTable, { TableColumn } from "../GenericTable";
import { listTrans } from "../../../api/stores/trans";
import { ITransaction } from "../../../api/models/Transaction";

export default function TransactionTable() {
    const history = useHistory();
    const { isLoading, isError, data, refetch } = useQuery(
        "listTransactions",
        listTrans
    );
    const alert = useAlertStore((state) => state.setAlert);
    const toast = (message: string) => alert(message);

    const columns: TableColumn<ITransaction, keyof ITransaction>[] = [
        { key: "transactionId", header: "ID" },
        { key: "buyerId", header: "Buyer" },
        { key: "datetime", header: "Date" },
        { key: "listingId", header: "Listing" },
        { key: "status" },
    ];
    return (
        <GenericTable
            data={data}
            columns={columns}
            isLoading={isLoading}
            isError={isError}
        />
    );
}
