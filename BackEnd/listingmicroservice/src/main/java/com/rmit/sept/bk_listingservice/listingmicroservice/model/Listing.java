package com.rmit.sept.bk_listingservice.listingmicroservice.model;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;

@Entity
public class Listing
{
    @Id
    private Long id;

    private Long userId;

    private Long bookId;

    private boolean used;

    @Enumerated(EnumType.STRING)
    private Condition cond;

    private String condDesc;
}