import {
    Dialog,
    DialogTitle,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
} from "@material-ui/core";
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
    const res = await getUser(id);
    if (res.status === 200) {
        console.log("success");
        const user = res.data as IAccount;
        return user.displayName;
    } else {
        return id;
    }
}

export default function ListTable(props: { isbn: string }) {
    const [open, setOpen] = React.useState(false);
    const [selectedListing, setSelectedListing] = React.useState<IListing>();
    const user = useAuthStore((state) => state.user);
    const setAlert = useAlertStore((state) => state.setAlert);
    const toast = (message: string) => {
        setAlert(message);
    };
    const handleBuyButton = (listing: IListing) => {
        if (user) {
            setOpen(true);
            setSelectedListing(listing);
        } else {
            toast("Please sign in to purchase a book");
        }
    };

    const deleteListing = (listing: IListing) => {
        toast("TODO delete users listing");
    };

    const actionButton = (listing: IListing): React.ReactNode => {
        return user && listing.userId.toString() === user.id.toString() ? (
            <Button
                variant="contained"
                color="secondary"
                onClick={() => deleteListing(listing)}
            >
                Delete
            </Button>
        ) : (
            <Button
                variant="contained"
                color="secondary"
                onClick={() => handleBuyButton(listing)}
            >
                Buy
            </Button>
        );
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedListing(undefined);
    };
    const { isLoading, data, refetch, isError } = useQuery(
        "listBookListings",
        () => listBookListings(props.isbn)
    );

    // TODO check that table fills out correctly when data gets fixed
    const columns: TableColumn<IListing, keyof IListing>[] = [
        { key: "id", header: "ID" },
        { key: "condition" },
        { key: "conditionDesc", header: "Condition Description" },
        {
            key: "userId",
            header: "User",
            // TODO
            // dataTransform: (id: string) => getDisplayName(id),
        },
        {
            key: "price",
            dataTransform: (price: number) => `$${price}`,
        },
        {
            key: "custom",
            header: " ",
            customComponent: (listing: IListing) => actionButton(listing),
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
            {selectedListing && user && (
                <PayPalDialog
                    listing={selectedListing}
                    open={open}
                    onClose={handleClose}
                    buyer={user}
                />
            )}
        </div>
    );
}

export interface PayPalDialogProps {
    open: boolean;
    listing: IListing;
    onClose: () => void;
    buyer: IAccount;
}

function PayPalDialog(props: PayPalDialogProps) {
    const { onClose, listing, open, buyer } = props;
    const setAlert = useAlertStore((state) => state.setAlert);
    const toast = (message: string) => {
        setAlert(message);
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Checkout with PayPal</DialogTitle>
            <div style={{ padding: "1rem" }}>
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
                        const captureId =
                            details.purchase_units[0].payments.captures[0].id;
                        toast("Successful purchase");
                        const request: CreateTransactionRequest = {
                            listingId: listing.id,
                            buyerId: buyer.id,
                            price: listing.price,
                            captureId,
                        };
                        createTrans(request);
                        handleClose();
                    }}
                    catchError={(err: any) => {
                        console.error("transaction error", err);
                    }}
                    onError={(err: any) => {
                        console.error(err);
                    }}
                />
                <script src="https://www.paypal.com/sdk/js?client-id=sd&currency=AUD" />
            </div>
        </Dialog>
    );
}
