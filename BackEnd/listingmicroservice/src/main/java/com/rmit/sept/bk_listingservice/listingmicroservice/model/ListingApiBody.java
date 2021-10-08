package com.rmit.sept.bk_listingservice.listingmicroservice.model;

public class ListingApiBody
{
    public Long userId;
    public Long bookIsbn;
    public boolean isUsed;
    public Condition condition;
    public String conditionDesc;
    public double price;
}
