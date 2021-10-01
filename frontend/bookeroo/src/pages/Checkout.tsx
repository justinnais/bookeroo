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

export default function Checkout( price: string,
                                     listings: Array<IListing>,
                                     buyer_id: string
) {
    const classes = useStyles();
    const { displayName } = useParams<{ displayName: string }>();
    const { isLoading, data } = useQuery("getUser", () => getUser(displayName));
    const profile: IAccount = data ? data.data : undefined;

    const CartDetails = () => (
        <div className={classes.topbar}>
            <Typography variant="h4" component="h4">
                        Cart
            </Typography>
        </div>
    );

    return(

         <div>
             <Container className={classes.root}>
                             <CartDetails />
             </Container>
            <script src="https://www.paypal.com/sdk/js?client-id=sd&currency=AUD" />
            <PayPalButton
                amount={price}
                onSuccess={() => {
                    const request: CreateTransactionRequest = {
                        listings: listings,
                        buyer_id: buyer_id,
                    };
                    createTrans(request);
                }}
            />
         </div>
    );
}