package com.rmit.sept.bk_transservices.transmicroservices.controller;

import com.rmit.sept.bk_transservices.transmicroservices.model.Transaction;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/trans")
public class TransController
{
    @PostMapping("/transaction")
    public ResponseEntity<?> transaction(@Valid @RequestBody Transaction transaction, BindingResult result)
    {
        // TODO: This whole method is temporary until I examine the paypal API more

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
