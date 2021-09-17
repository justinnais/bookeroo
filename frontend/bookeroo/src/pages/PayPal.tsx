import React from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { CreateTransactionRequest } from "../api/microservices/trans";
import { Listing } from "../api/microservices/trans";
import { createTrans } from "../api/stores/trans";

export default function PayPal(
    price: string,
    listings: Array<Listing>,
    buyer_id: string
) {
    return (
        <div>
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
