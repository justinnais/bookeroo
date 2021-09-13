package com.rmit.sept.bk_listingservice.listingmicroservice.controller;

import com.rmit.sept.bk_listingservice.listingmicroservice.model.Listing;
import com.rmit.sept.bk_listingservice.listingmicroservice.model.ListingApiBody;
import com.rmit.sept.bk_listingservice.listingmicroservice.model.SellListing;
import com.rmit.sept.bk_listingservice.listingmicroservice.repository.ListingRepository;
import com.rmit.sept.bk_listingservice.listingmicroservice.repository.SellListingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/listing")
@CrossOrigin(origins = "http://localhost:3000")
public class ListingController
{
    @Autowired
    ListingRepository listingRepository;

    @Autowired
    SellListingRepository sellListingRepository;

    @PostMapping("/create/{type}")
    public ResponseEntity<?> createListing(@PathVariable("type") String type,
                                           @RequestBody ListingApiBody body, BindingResult result)
    {
        if (type.equals("swap"))
            return new ResponseEntity<>(HttpStatus.I_AM_A_TEAPOT);
        else if (!type.equals("sell"))
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        Listing listing = new Listing();
        listing.setUserId(body.userId);
        listing.setBookId(body.bookId);
        listing.setUsed(body.used);
        listing.setCond(body.cond);
        listing.setCondDesc(body.condDesc);

        listingRepository.save(listing);

        // I know this is always true, but it is future planning for when swap is implemented
        if (type.equals("sell"))
        {
            SellListing sellListing = new SellListing();
            sellListing.setListingId(listing.getId());
            sellListing.setPrice(body.price);

            sellListingRepository.save(sellListing);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
