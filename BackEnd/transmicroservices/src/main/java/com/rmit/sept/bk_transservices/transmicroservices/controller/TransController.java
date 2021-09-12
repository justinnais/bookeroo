package com.rmit.sept.bk_transservices.transmicroservices.controller;

import com.rmit.sept.bk_transservices.transmicroservices.model.TransApiBody;
import com.rmit.sept.bk_transservices.transmicroservices.model.Transaction;
import com.rmit.sept.bk_transservices.transmicroservices.model.TransactionItem;
import com.rmit.sept.bk_transservices.transmicroservices.repositories.TransactionItemRepository;
import com.rmit.sept.bk_transservices.transmicroservices.repositories.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/trans")
@CrossOrigin(origins = "http://localhost:3000")
public class TransController
{
    @Autowired
    TransactionItemRepository transItemRepository;

    @Autowired
    TransactionRepository transactionRepository;

    @PostMapping("/transaction")
    public ResponseEntity<?> transaction(@RequestBody TransApiBody transApiBody, BindingResult result)
    {
        Transaction transaction = new Transaction();
        transactionRepository.save(transaction);
        System.out.println(transaction.getId());


        return new ResponseEntity<>(HttpStatus.OK);
    }
}
