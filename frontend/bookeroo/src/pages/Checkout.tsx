import {
    Container,
    createStyles,
    makeStyles,
    Theme,
    Typography,
} from "@material-ui/core";
import React from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../components/Button/Button";
import { IBook } from "../api/models/Book";
import { getUser, listUsers } from "../api/stores/user";
import { useQuery } from "react-query";
import { IAccount } from "../api/models/Account";
import { Skeleton } from "@material-ui/lab";
import { PayPalButton } from "react-paypal-button-v2";
import { IListing, CreateTransactionRequest } from "../api/models/Listing";
import { createTrans } from "../api/stores/trans";
import GridLayout from "../components/Layout/GridLayout";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        topbar: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: theme.spacing(10),
        },
        root: {
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
        },
        cartDetails: {
            display: "flex",
            alignItems: "left",
            justifyContent: "left",
            flexDirection: "column",
        },
    })
);

interface Props {
    price: string;
    listings: Array<IListing>;
    buyerId: string;
}

export default function Checkout() {
    const classes = useStyles();
    const { displayName } = useParams<{ displayName: string }>();
    const { isLoading, data } = useQuery("getUser", () => getUser(displayName));
    const profile: IAccount = data ? data.data : undefined;

    const price: number = 40;
    // const listings: Array<IListing> =
    // const buyerId: string =

    const CartDetails = () => (
        <div className={classes.topbar}>
            <Typography variant="h4" component="h4">
                Cart
            </Typography>
        </div>
    );

    const Foo = () => (
        <div>
            <Typography variant="h4" component="h4">
                Price: $45
            </Typography>
        </div>
    );

    const CartItems = (props: { items: number[] }) => (
        <div>
            {props.items.map((item) => (
                <div style={{ marginBottom: 10 }}>
                    <Skeleton variant="rect" height={40} />
                </div>
            ))}
        </div>
    );

    return (
        <div>
            <Container className={classes.root}>
                <CartDetails />
                <GridLayout
                    items={[
                        <CartItems items={[1, 2, 3, 4, 5]} />,
                        <div>
                            <Foo />
                            <PayPalButton
                                amount={price}
                                onSuccess={() => {
                                    /* const request: CreateTransactionRequest = {
                                listings: listings,
                                buyer_id: buyerId,
                            };
                            createTrans(request); */
                                    console.log("success");
                                }}
                            />
                        </div>,
                    ]}
                    size={[7, 5]}
                    spacing={2}
                    reverseLayout={true}
                />
            </Container>
            <script src="https://www.paypal.com/sdk/js?client-id=sd&currency=AUD" />
        </div>
    );
}
