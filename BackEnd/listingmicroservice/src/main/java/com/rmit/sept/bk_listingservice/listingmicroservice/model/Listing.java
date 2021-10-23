package com.rmit.sept.bk_listingservice.listingmicroservice.model;

import javax.persistence.*;

/**
 * Represents the Listing entity in the system
 */
@Entity
public class Listing
{
    /**
     * id used to uniquely identify listings
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    /**
     * id of the user who made the listing
     */
    private Long userId;
    /**
     * ISBN of the book the listing is made for
     */
    private Long bookIsbn;
    /**
     * Boolean representing if the book is new or used
     */
    private boolean used;
    /**
     * Physical condition of the book
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "cond")
    private Condition condition;
    /**
     * Description of the condition of the book
     */
    @Column(name = "cond_desc")
    private String conditionDesc;
    /**
     * Price assigned to this listing of the book
     */
    private Long price;

    public Long getBookIsbn()
    {
        return bookIsbn;
    }

    public void setBookIsbn(Long bookIsbn)
    {
        this.bookIsbn = bookIsbn;
    }

    public Long getPrice()
    {
        return price;
    }

    public void setPrice(Long price)
    {
        this.price = price;
    }

    public Long getId()
    {
        return id;
    }

    public void setId(Long id)
    {
        this.id = id;
    }

    public Long getUserId()
    {
        return userId;
    }

    public void setUserId(Long userId)
    {
        this.userId = userId;
    }

    public Boolean isUsed()
    {
        return used;
    }

    public void setUsed(boolean used)
    {
        this.used = used;
    }

    public Condition getCondition()
    {
        return condition;
    }

    public void setCondition(Condition condition)
    {
        this.condition = condition;
    }

    public String getConditionDesc()
    {
        return conditionDesc;
    }

    public void setConditionDesc(String conditionDesc)
    {
        this.conditionDesc = conditionDesc;
    }
}