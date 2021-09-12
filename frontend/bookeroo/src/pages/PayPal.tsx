import React from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { string } from "yup/lib/locale";
import { post } from "../api/api"
import {CreateTransactionRequest} from "../api/microservices/trans"

export default function PayPal(listing_price_map: Map<string, string>, buyer_id: string) {
    return (
        <div>
            <script src="https://www.paypal.com/sdk/js?client-id=sd&currency=AUD" />
            <PayPalButton
                amount="0.01"
                onSuccess={() => {
                    const request: CreateTransactionRequest = {
                        type: "trans/transaction",
                        listing_price_map: listing_price_map,
                        buyer_id: buyer_id,
                    };
                    post(request);
                }}
            />
        </div>
    );
}