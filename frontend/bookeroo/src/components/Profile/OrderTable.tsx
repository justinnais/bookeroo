import { Typography } from "@material-ui/core";
import React from "react";
import { useQuery } from "react-query";
import { ITransaction } from "../../api/models/Transaction";
import { getUsersTrans } from "../../api/stores/trans";
import GenericTable, { TableColumn } from "../Table/GenericTable";

interface Props {
    buyerId: number;
}

/**
 * Table that shows the current logged in users past orders
 * @param props
 * @returns
 */
export default function OrderTable(props: Props) {
    const { isLoading, isError, data, refetch } = useQuery("getUserTrans", () =>
        getUsersTrans(props.buyerId)
    );

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
