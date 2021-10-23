import { Typography } from "@material-ui/core";
import React from "react";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import { ITransaction } from "../../api/models/Transaction";
import { getUsersTrans } from "../../api/stores/trans";
import { useAlertStore } from "../../stores/useAlertStore";
import GenericTable, { TableColumn } from "../Table/GenericTable";

interface Props {
    buyerId: number;
}

export default function OrderTable(props: Props) {
    const history = useHistory();
    const { isLoading, isError, data, refetch } = useQuery("getUserTrans", () =>
        getUsersTrans(props.buyerId)
    );
    const alert = useAlertStore((state) => state.setAlert);
    const toast = (message: string) => alert(message);

    const columns: TableColumn<ITransaction, keyof ITransaction>[] = [
        { key: "transactionId", header: "ID" },
        {
            key: "datetime",
            header: "Date",
            dataTransform: (date: string) => new Date(date).toDateString(),
        },
        { key: "listingId", header: "Listing" },
        { key: "price" },
        { key: "status" },
    ];

    if (!data || data.data.length === 0) {
        return <Typography variant="body1">You have no orders.</Typography>;
    }
    return (
        <GenericTable
            data={data}
            columns={columns}
            isLoading={isLoading}
            isError={isError}
            printButton
        />
    );
}
