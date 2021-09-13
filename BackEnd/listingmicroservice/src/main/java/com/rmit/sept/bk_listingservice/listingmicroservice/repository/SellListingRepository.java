package com.rmit.sept.bk_listingservice.listingmicroservice.repository;

import com.rmit.sept.bk_listingservice.listingmicroservice.model.SellListing;
import org.springframework.data.repository.CrudRepository;

public interface SellListingRepository extends CrudRepository<SellListing, Long>
{
}
