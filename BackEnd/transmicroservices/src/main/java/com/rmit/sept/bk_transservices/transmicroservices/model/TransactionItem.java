package com.rmit.sept.bk_transservices.transmicroservices.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class TransactionItem
{
    @Id
    private double listingId;

    // TODO: This could be properly annotated with "ManyToOne" and a "JoinColumn"
    private double transactionId;

    private double amount;

    public double getListingId()
    {
        return listingId;
    }

    public void setListingId(double listingId)
    {
        this.listingId = listingId;
    }

    public double getTransactionId()
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
