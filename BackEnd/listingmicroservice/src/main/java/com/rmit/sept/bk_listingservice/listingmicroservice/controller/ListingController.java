package com.rmit.sept.bk_listingservice.listingmicroservice.controller;

import com.rmit.sept.bk_listingservice.listingmicroservice.model.Listing;
import com.rmit.sept.bk_listingservice.listingmicroservice.model.ListingApiBody;
import com.rmit.sept.bk_listingservice.listingmicroservice.model.SellListing;
import com.rmit.sept.bk_listingservice.listingmicroservice.repositories.ListingRepository;
import com.rmit.sept.bk_listingservice.listingmicroservice.repositories.SellListingRepository;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

        if (body.userId == null || body.bookIsbn == null)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        Listing listing = new Listing();
        listing.setUserId(body.userId);
        listing.setbookIsbn(body.bookIsbn);
        listing.setUsed(body.used);
        listing.setCondition(body.condition);
        listing.setConditionDesc(body.conditionDesc);

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

    @GetMapping("/list/{bookIsbn}")
    public ResponseEntity<?> listListings(@PathVariable("bookIsbn") Long bookIsbn)
    {
        // This is way more hacky than it should be, but weird errors keep happening with the test
        // Talk to Josh if you want more info
        // TODO: Investigate JSON null bug with tests
        List<Listing> listingBookIsbn = listingRepository.getListingByBookIsbn(bookIsbn);
        JSONArray array = new JSONArray();
        for (Listing listing : listingBookIsbn)
        {
            JSONObject obj = new JSONObject();
            obj.put("id", listing.getId());
            obj.put("userId", listing.getUserId());
            obj.put("bookIsbn", listing.getbookIsbn());
            obj.put("used", listing.isUsed());
            obj.put("condition", listing.getCondition());
            obj.put("conditionDesc", listing.getConditionDesc());

            SellListing sl = sellListingRepository.getSellListingByListingId(listing.getId());
            obj.put("price", sl.getPrice());

            array.put(obj);
        }
        return ResponseEntity.ok().header("Content-Type", "application/json")
                .body(array.toString());
    }

    // LIST ALL 
    @GetMapping("")
    public ResponseEntity<?> listListings()
    {
        JSONArray listings = new JSONArray();
        List<Object[]> listingBybookIsbn = listingRepository.getAllListings();

        return new ResponseEntity<>(listingBybookIsbn.toString(), HttpStatus.OK);
    }

    private ResponseEntity<?> responseToArray(List<Object[]> listingBybookIsbn)
    {
        JSONArray listings = new JSONArray();
        for (Object[] details : listingBybookIsbn)
        {
            JSONObject listing = new JSONObject();
            listing.put("condition", details[0]);
            listing.put("conditionDesc", details[1]);
            listing.put("used", details[2]);
            listing.put("price", details[3]);

            listings.put(listing);
        }

        return ResponseEntity.ok(listings.toString());
    }

    // TODO: Get specific listing
}
