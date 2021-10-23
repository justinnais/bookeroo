package com.rmit.sept.bk_transservices.transmicroservices.model;

import javax.persistence.*;
import java.util.Date;

/**
 * Representation of the Transaction entity in the system
 */
@Entity
public class Transaction
{
    /**
     * Unique identifying value for the transaction
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long transactionId;
    /**
     * User id of the buyer
     */
    private Long buyerId;
    /**
     * Date and time that the transaction was made
     */
    private Date datetime;
    /**
     * Status of the transaction
     */
    private Status status;
    /**
     * Id of the listing the transaction was made for
     */
    private Long listingId;
    /**
     * Price of the transaction
     */
    private Long price;
    private String captureId;

    public Long getListingId()
    {
        return listingId;
    }

    public void setListingId(Long listingId)
    {
        this.listingId = listingId;
    }

    public Long getPrice()
    {
        return price;
    }

    public void setPrice(Long price)
    {
        this.price = price;
    }

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

    public String getCaptureId()
    {
        return captureId;
    }

    public void setCaptureId(String captureId)
    {
        this.captureId = captureId;
    }

    /**
     * Sets the datetime and status of the transaction
     */
    @PrePersist
    protected void onCreate()
    {
        datetime = new Date();
        status = Status.PENDING;
    }
}
