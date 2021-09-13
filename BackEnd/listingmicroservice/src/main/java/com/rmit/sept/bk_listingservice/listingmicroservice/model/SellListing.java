package com.rmit.sept.bk_listingservice.listingmicroservice.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class SellListing
{
    @Id
    private Long id;

    private Long ListingId;

    private double price;
}
