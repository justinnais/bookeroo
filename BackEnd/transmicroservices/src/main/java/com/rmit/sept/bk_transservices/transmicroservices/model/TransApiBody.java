package com.rmit.sept.bk_transservices.transmicroservices.model;

import java.util.List;
import java.util.Map;

public class TransApiBody
{
    public String buyer_id;
    public List<Map<String, String>> listings;

    @Override
    public String toString()
    {
        return "Transaction{" +
                "buyer_id='" + buyer_id + '\'' +
                ", listings=" + listings +
                '}';
    }
}
