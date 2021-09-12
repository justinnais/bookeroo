package com.rmit.sept.bk_transservices.transmicroservices.model;

import java.util.Map;

public class Transaction
{
    public String buyer_id;
    public Object listings;

    @Override
    public String toString()
    {
        return "Transaction{" +
                "buyer_id='" + buyer_id + '\'' +
                ", listing_price_map=" + listings +
                '}';
    }
}
