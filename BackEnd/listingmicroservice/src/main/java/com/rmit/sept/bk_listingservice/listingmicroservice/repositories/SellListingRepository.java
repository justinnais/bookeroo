package com.rmit.sept.bk_listingservice.listingmicroservice.repositories;

import com.rmit.sept.bk_listingservice.listingmicroservice.model.SellListing;
import org.springframework.data.repository.CrudRepository;

public interface SellListingRepository extends CrudRepository<SellListing, Long>
{
    SellListing getSellListingByListingId(Long listingId);
}
