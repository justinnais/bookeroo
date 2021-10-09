import React from "react";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import { IAccount } from "../../../api/models/Account";
import { IListing } from "../../../api/models/Listing";
import { listUsers, editUser } from "../../../api/stores/user";
import { useAlertStore } from "../../../stores/useAlertStore";
import { AccountStatus } from "../../../util/enums";
import Menu, { IMenuItem } from "../../Layout/Menu";
import GenericTable, { TableColumn } from "../GenericTable";
import { listTrans } from "../../../api/stores/trans";

export default function TransactionTable() {
    const history = useHistory();
    const { isLoading, isError, data, refetch } = useQuery(
        "listTransactions",
        listTrans
    );
    const alert = useAlertStore((state) => state.setAlert);
    const toast = (message: string) => alert(message);

    const columns: TableColumn<IListing, keyof IListing>[] = [
        { key: "id", header: "ID" },
        { key: "bookIsbn", header: "ISBN" },
        { key: "userId", header: "User" },
        { key: "condition" },
        { key: "conditionDesc", header: "Condtion Description" },
    ];
    return <GenericTable data={data} columns={columns} isLoading={isLoading} />;
}
