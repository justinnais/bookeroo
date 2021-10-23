package com.rmit.sept.bk_listingservice.listingmicroservice.repositories;

import com.rmit.sept.bk_listingservice.listingmicroservice.model.Listing;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * CRUD repository for {@link Listing}
 */
public interface ListingRepository extends CrudRepository<Listing, Long>
{
    /**
     * Retrieves a list of listings with the specified bookIsbn
     *
     * @param bookIsbn ISBN of listings to search for
     * @return List of {@link Listing}
     */
    List<Listing> getListingByBookIsbn(Long bookIsbn);

    /**
     * Retrieves all listings
     *
     * @return List of {@link Listing}
     */
    @Query("SELECT l FROM Listing l")
    List<Listing> getAllListings();
}
