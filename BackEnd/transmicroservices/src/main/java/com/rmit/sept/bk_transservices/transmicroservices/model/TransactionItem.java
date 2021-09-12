package com.rmit.sept.bk_transservices.transmicroservices.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class TransactionItem
{
    @Id
    private Long listingId;

    private Long transactionId;

    private double amount;

    public Long getListingId()
    {
        return listingId;
    }

    public void setListingId(Long listingId)
    {
        this.listingId = listingId;
    }

    public Long getTransactionId()
    {
        return transactionId;
    }

    public void setTransactionId(Long transactionId)
    {
        this.transactionId = transactionId;
    }

    public double getAmount()
    {
        return amount;
    }

    public void setAmount(double amount)
    {
        this.amount = amount;
    }
}
