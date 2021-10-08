import React from "react";
import { useQuery } from "react-query";
import { IAccount } from "../../api/models/Account";
import { IListing } from "../../api/models/Listing";
import { listBookListings } from "../../api/stores/listing";
import { getUser } from "../../api/stores/user";
import Button from "../Button/Button";
import GenericTable, { TableColumn } from "../Table/GenericTable";

async function getDisplayName(id: string) {
    console.log("getting display name", id);
    return await getUser(id).then((res) => {
        if (res.status === 200) {
            console.log("success");
            const user = res.data as IAccount;
            return user.displayName;
        } else {
            return id;
        }
    });
    /* foo.then(
      (res) => console.log("res", res),
      (err) => console.log("err", err)
  ); */
}

export default function ListTable(props: { isbn: string }) {
    const { isLoading, data, refetch } = useQuery("listBookListings", () =>
        listBookListings(props.isbn)
    );
    let listings = data ? [data.data] : [];

    // TODO check that table fills out correctly when data gets fixed
    const columns: TableColumn<IListing, keyof IListing>[] = [
        { key: "id", header: "ID" },
        { key: "condition" },
        { key: "conditionDesc", header: "Condition Description" },
        {
            key: "userId",
            header: "User",
            // TODO
            /* dataTransform: (id: string) =>
                getDisplayName(id).then((res) => res), */
        },
        {
            key: "custom",
            customComponent: () => (
                <Button variant="contained" color="secondary">
                    Purchase
                </Button>
            ),
            header: " ",
        },
    ];

    console.log("displayname", getDisplayName("47"));

    console.log("data", data);
    console.log("listings", listings);

    return (
        <GenericTable data={listings} columns={columns} isLoading={isLoading} />
        // <div>foo</div>
    );
}
