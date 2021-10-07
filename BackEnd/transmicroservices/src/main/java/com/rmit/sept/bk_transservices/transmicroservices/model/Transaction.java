package com.rmit.sept.bk_transservices.transmicroservices.model;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Transaction
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long transactionId;

    private Long buyerId;

    private Date datetime;

    private Status status;

    public Status getStatus()
    {
        return status;
    }

    public void setStatus(Status status)
    {
        this.status = status;
    }

    public Long getTransactionId()
    {
        return transactionId;
    }

    public void setTransactionId(Long transactionId)
    {
        this.transactionId = transactionId;
    }

    public Long getBuyerId()
    {
        return buyerId;
    }

    public void setBuyerId(Long buyerId)
    {
        this.buyerId = buyerId;
    }

    public Date getDatetime()
    {
        return datetime;
    }

    public void setDatetime(Date datetime)
    {
        this.datetime = datetime;
    }

    @PrePersist
    protected void onCreate()
    {
        datetime = new Date();
    }
}
