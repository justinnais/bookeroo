package com.rmit.sept.bk_transservices.transmicroservices.controller;

import com.rmit.sept.bk_transservices.transmicroservices.model.Transaction;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/trans")
@CrossOrigin(origins = "http://localhost:3000")
public class TransController
{
    @PostMapping("/transaction")
    public ResponseEntity<?> transaction(@RequestBody Transaction transaction, BindingResult result)
    {
        System.out.println(transaction.toString());
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
