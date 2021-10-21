import React from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { isError, useQuery } from "react-query";
import { IAccount } from "../../api/models/Account";
import { CreateTransactionRequest, IListing } from "../../api/models/Listing";
import { listBookListings, listListings } from "../../api/stores/listing";
import { createTrans } from "../../api/stores/trans";
import { getUser } from "../../api/stores/user";
import { useAlertStore } from "../../stores/useAlertStore";
import { useAuthStore } from "../../stores/useAuthStore";
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
    const { isLoading, data, refetch, isError } = useQuery(
        "listBookListings",
        () => listBookListings(props.isbn)
    );
    const setAlert = useAlertStore((state) => state.setAlert);
    const toast = (message: string) => {
        setAlert(message);
    };

    const user = useAuthStore((state) => state.user);

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
            key: "price",
            dataTransform: (price: number) => `$${price}`,
        },
        {
            key: "custom",
            customComponent: (listing: IListing) => (
                <PayPalButton
                    amount={listing.price}
                    style={{
                        layout: "horizontal",
                        color: "black",
                        shape: "rect",
                        label: "paypal",
                        tagline: false,
                    }}
                    onSuccess={(details: any) => {
                        console.log("success", details);
                        toast("successful purchase");
                        const request: CreateTransactionRequest = {
                            listingId: listing.id,
                            buyerId: user!.id, // TODO fix this
                            price: listing.price,
                        };
                        createTrans(request);
                    }}
                    catchError={(err: any) => {
                        console.error("transaction error", err);
                    }}
                    onError={(err: any) => {
                        console.error(err);
                    }}
                />
            ),
            header: " ",
        },
    ];

    return (
        <div>
            <GenericTable
                data={data}
                columns={columns}
                isLoading={isLoading}
                isError={isError}
            />
            <script src="https://www.paypal.com/sdk/js?client-id=sd&currency=AUD" />
        </div>
    );
}
