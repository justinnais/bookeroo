import React from "react";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import { IAccount } from "../../../api/models/Account";
import { listUsers, editUser } from "../../../api/stores/user";
import { useAlertStore } from "../../../stores/useAlertStore";
import { AccountStatus } from "../../../util/enums";
import Button from "../../Button/Button";
import Menu, { IMenuItem } from "../../Layout/Menu";
import GenericTable, { TableColumn } from "../GenericTable";

export default function UserTable() {
    const history = useHistory();
    const { isLoading, isError, data, refetch } = useQuery(
        "listUsers",
        listUsers
    );
    const users = data ? (data.data as IAccount[]) : [];
    const alert = useAlertStore((state) => state.setAlert);
    const toast = (message: string) => alert(message);

    const adjustStatus = (id: number, accountStatus: AccountStatus) => {
        editUser(id, { accountStatus })
            .then((res) =>
                res.status === 200
                    ? toast(
                          `Successfully set account status to ${accountStatus}`
                      )
                    : toast("Failed to set account status")
            )
            .finally(() => refetch()); // TODO refetch not the best way to do this, useMutation
    };

    const handleClick = (user: IAccount) => {
        history.push(`/user/${user.displayName}`);
    };

    // TODO add actual functions for these options
    const getMenuItems = (user: IAccount): IMenuItem[] => {
        let menuItems: IMenuItem[] = [];

        switch (user.accountStatus) {
            case AccountStatus.PENDING:
                menuItems = [
                    {
                        label: "Approve",
                        onClick: () =>
                            adjustStatus(user.id, AccountStatus.ACTIVE),
                    },
                    {
                        label: "Reject",
                        onClick: () =>
                            adjustStatus(user.id, AccountStatus.REJECTED),
                    },
                ];
                break;
            case AccountStatus.BANNED:
                menuItems = [
                    {
                        label: "Unban",
                        onClick: () =>
                            adjustStatus(user.id, AccountStatus.ACTIVE),
                    },
                ];
                break;
            case AccountStatus.REJECTED:
                menuItems = [
                    {
                        label: "Approve",
                        onClick: () =>
                            adjustStatus(user.id, AccountStatus.ACTIVE),
                    },
                ];
                break;

            default:
                menuItems = [
                    {
                        label: "Ban",
                        onClick: () =>
                            adjustStatus(user.id, AccountStatus.BANNED),
                    },
                ];
                break;
        }
        menuItems.push({
            label: "Close",
            onClick: () => console.log("closing"),
        });
        return menuItems;
    };

    const columns: TableColumn<IAccount, keyof IAccount>[] = [
        { key: "id", header: "ID" },
        { key: "displayName", header: "Display Name" },
        { key: "firstName", header: "First Name" },
        { key: "lastName", header: "Last Name" },
        { key: "username", header: "Email" },
        {
            key: "dateCreated",
            header: "Date Created",
            dataTransform: (date: string) => new Date(date).toDateString(),
        },
        { key: "accountType", header: "Account Type" },
        { key: "accountStatus", header: "Status" },
        {
            key: "custom",
            header: "Manage",
            customComponent: (data: IAccount) => (
                <Menu
                    buttonLabel="Edit"
                    id={`${data.id}-menu`}
                    items={getMenuItems(data)}
                />
            ),
        },
    ];


    return (
        <GenericTable
            data={users}
            columns={columns}
            onRowClick={handleClick}
            isLoading={isLoading}
            isError={isError}
            printButton
        />
    );
}

