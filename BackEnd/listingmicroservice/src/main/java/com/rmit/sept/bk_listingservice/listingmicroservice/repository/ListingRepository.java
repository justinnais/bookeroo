package com.rmit.sept.bk_listingservice.listingmicroservice.repository;

import com.rmit.sept.bk_listingservice.listingmicroservice.model.Listing;
import org.springframework.data.repository.CrudRepository;

public interface ListingRepository extends CrudRepository<Listing, Long>
{
}
