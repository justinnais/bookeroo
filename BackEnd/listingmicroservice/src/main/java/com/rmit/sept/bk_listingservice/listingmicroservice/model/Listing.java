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

    private boolean used;

    @Enumerated(EnumType.STRING)
    private Condition cond;

    private String condDesc;

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

    public Long getbookIsbn()
    {
        return bookIsbn;
    }

    public void setbookIsbn(Long bookIsbn)
    {
        this.bookIsbn = bookIsbn;
    }

    public boolean isUsed()
    {
        return used;
    }

    public void setUsed(boolean used)
    {
        this.used = used;
    }

    public Condition getCond()
    {
        return cond;
    }

    public void setCond(Condition cond)
    {
        this.cond = cond;
    }

    public String getCondDesc()
    {
        return condDesc;
    }

    public void setCondDesc(String condDesc)
    {
        this.condDesc = condDesc;
    }
}