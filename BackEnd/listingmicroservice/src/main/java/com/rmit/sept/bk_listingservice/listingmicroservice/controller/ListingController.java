package com.rmit.sept.bk_listingservice.listingmicroservice.controller;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.rmit.sept.bk_listingservice.listingmicroservice.model.Listing;
import com.rmit.sept.bk_listingservice.listingmicroservice.repositories.ListingRepository;
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

    @PostMapping("")
    public ResponseEntity<?> createListing(@RequestBody Listing listing)
    {
        listingRepository.save(listing);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/list/{bookIsbn}")
    public ResponseEntity<?> listListings(@PathVariable("bookIsbn") Long bookIsbn)
    {
        Gson gson = new Gson();
        JsonArray array = new JsonArray();

        List<Listing> listingBookIsbn = listingRepository.getListingByBookIsbn(bookIsbn);
        listingBookIsbn.forEach(listing -> array.add(JsonParser.parseString(gson.toJson(listing))));

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
