package com.rmit.sept.bk_listingservice.listingmicroservice.model;

import javax.persistence.*;

@Entity
public class Listing
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long userId;
    private Long bookIsbn;
    private boolean isUsed;

    @Enumerated(EnumType.STRING)
    @Column(name = "cond")
    private Condition condition;
    @Column(name = "cond_desc")
    private String conditionDesc;
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
        return isUsed;
    }

    public void setUsed(boolean used)
    {
        this.isUsed = used;
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