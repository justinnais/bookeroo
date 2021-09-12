package com.rmit.sept.bk_transservices.transmicroservices.controller;

import com.rmit.sept.bk_transservices.transmicroservices.model.TransApiBody;
import com.rmit.sept.bk_transservices.transmicroservices.model.TransactionItem;
import com.rmit.sept.bk_transservices.transmicroservices.repositories.TransactionItemRepository;
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

    @PostMapping("/transaction")
    public ResponseEntity<?> transaction(@RequestBody TransApiBody transApiBody, BindingResult result)
    {
        TransactionItem transItem = new TransactionItem();
        transItem.setAmount(20.0);
        transItem.setListingId(2L);

        transItemRepository.save(transItem);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
