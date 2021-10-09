package com.rmit.sept.bk_listingservice.listingmicroservice.controller;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.rmit.sept.bk_listingservice.listingmicroservice.model.Listing;
import com.rmit.sept.bk_listingservice.listingmicroservice.model.ListingApiBody;
import com.rmit.sept.bk_listingservice.listingmicroservice.model.SellListing;
import com.rmit.sept.bk_listingservice.listingmicroservice.repositories.ListingRepository;
import com.rmit.sept.bk_listingservice.listingmicroservice.repositories.SellListingRepository;
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
    // TODO: Scrap different listing types and make everything a sell listing

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
        listing.setUsed(body.isUsed);
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
        List<Listing> listingBookIsbn = listingRepository.getListingByBookIsbn(bookIsbn);
        Gson gson = new Gson();
        JsonArray array = new JsonArray();

        for (Listing listing : listingBookIsbn)
        {
            JsonObject obj = (JsonObject) JsonParser.parseString(gson.toJson(listing));
            SellListing sl = sellListingRepository
                    .getSellListingByListingId(obj.get("id").getAsLong());
            obj.addProperty("price", sl.getPrice());

            array.add(obj);
        }

        return ResponseEntity.ok().body(array.toString());
    }

    // LIST ALL 
    @GetMapping("")
    public ResponseEntity<?> listListings()
    {
        List<Listing> listingBybookIsbn = listingRepository.getAllListings();
        return new ResponseEntity<>(listingBybookIsbn, HttpStatus.OK);
    }

    // TODO: Get specific listing
}
