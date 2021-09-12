import React from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { string } from "yup/lib/locale";
import { post } from "../api/api";
import { CreateTransactionRequest } from "../api/microservices/trans";
import { Listing } from "../api/microservices/trans";

export default function PayPal(listings: Array<Listing>, buyer_id: string) {
    return (
        <div>
            <script src="https://www.paypal.com/sdk/js?client-id=sd&currency=AUD" />
            <PayPalButton
                amount="0.01"
                onSuccess={() => {
                    const listing: Listing = {
                        listing_id: "asdf",
                        price: "123"
                    }
                    const request: CreateTransactionRequest = {
                        type: "trans/transaction",
                        listings: [listing],
                        buyer_id: "buyer_id_temp",
                    };
                    console.log(request)
                    console.log(post(request));
                }}
            />
        </div>
    );
}