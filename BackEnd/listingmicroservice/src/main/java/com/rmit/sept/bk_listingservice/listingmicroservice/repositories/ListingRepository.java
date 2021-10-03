package com.rmit.sept.bk_listingservice.listingmicroservice.repositories;

import com.rmit.sept.bk_listingservice.listingmicroservice.model.Listing;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ListingRepository extends CrudRepository<Listing, Long>
{
    List<Listing> getListingByBookIsbn(Long bookIsbn);

    @Query("SELECT l.condition, l.conditionDesc, l.used, sl.price " +
            "FROM Listing l " +
            "JOIN SellListing sl ON l.id = sl.listingId ")
    List<Object[]> getAllListings();

    // TODO: Create an object to hold the response rather than using an array
    // TODO: Consider if swap listings should be returned here
}
