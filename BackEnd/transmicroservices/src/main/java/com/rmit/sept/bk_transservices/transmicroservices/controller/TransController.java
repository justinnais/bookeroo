package com.rmit.sept.bk_transservices.transmicroservices.controller;

import com.rmit.sept.bk_transservices.transmicroservices.model.Transaction;
import com.rmit.sept.bk_transservices.transmicroservices.repositories.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/trans")
@CrossOrigin(origins = "http://localhost:3000")
public class TransController
{
    @Autowired
    TransactionRepository transactionRepository;

    @PostMapping("")
    public ResponseEntity<?> transaction(@RequestBody Transaction transaction)
    {
        if (transaction.getTransactionId() != null)
            return new ResponseEntity<>("Request cannot contain transaction id",
                    HttpStatus.BAD_REQUEST);
        if (transaction.getBuyerId() == null)
            return new ResponseEntity<>("buyerId property required", HttpStatus.BAD_REQUEST);
        if (transaction.getPrice() == null)
            return new ResponseEntity<>("price property required", HttpStatus.BAD_REQUEST);
        if (transaction.getListingId() == null)
            return new ResponseEntity<>("listingId property required", HttpStatus.BAD_REQUEST);

        transactionRepository.save(transaction);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(value = "/list/{buyerId}")
    public ResponseEntity<?> list(@PathVariable("buyerId") Long buyerId)
    {
        List<Transaction> transactions = transactionRepository.getTransactionByBuyerId(buyerId);
        return ResponseEntity.ok(transactions);
    }

    @DeleteMapping("/{transId}")
    public ResponseEntity<?> deleteTransaction(@PathVariable("transId") Long transId)
    {
        Optional<Transaction> transResult = transactionRepository.findById(transId);
        if (transResult.isEmpty())
            return new ResponseEntity<>("No transaction exists with that id", HttpStatus.NOT_FOUND);
        Transaction transaction = transResult.get();

        long currentTime = new Date().getTime();
        long diff = currentTime - transaction.getDatetime().getTime();
        if (diff > 7200000)
            return new ResponseEntity<>("More than 2 hours have elapsed since this transaction " +
                    "was made", HttpStatus.LOCKED);

        transactionRepository.deleteById(transId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
