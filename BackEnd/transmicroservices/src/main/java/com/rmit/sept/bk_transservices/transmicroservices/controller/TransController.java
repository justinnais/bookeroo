package com.rmit.sept.bk_transservices.transmicroservices.controller;

import com.rmit.sept.bk_transservices.transmicroservices.model.TransApiBody;
import com.rmit.sept.bk_transservices.transmicroservices.model.Transaction;
import com.rmit.sept.bk_transservices.transmicroservices.model.TransactionItem;
import com.rmit.sept.bk_transservices.transmicroservices.repositories.TransactionItemRepository;
import com.rmit.sept.bk_transservices.transmicroservices.repositories.TransactionRepository;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/trans")
@CrossOrigin(origins = "http://localhost:3000")
public class TransController
{
    @Autowired
    TransactionItemRepository transItemRepository;

    @Autowired
    TransactionRepository transactionRepository;

    // TODO update this to match other apis
    @PostMapping("/transaction")
    public ResponseEntity<?> transaction(@RequestBody TransApiBody transApiBody,
                                         BindingResult result)
    {
        Transaction transaction = new Transaction();
        transaction.setBuyerId(transApiBody.buyer_id);
        transactionRepository.save(transaction);

        if (transApiBody.listings == null || transApiBody.buyer_id == null)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        for (Map<String, Double> map : transApiBody.listings)
        {
            TransactionItem transItem = new TransactionItem();
            transItem.setTransactionId(transaction.getTransactionId());
            transItem.setAmount(map.get("price"));
            transItem.setListingId(map.get("listing_id"));

            transItemRepository.save(transItem);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(value = "/list/{buyerId}")
    public ResponseEntity<?> list(@PathVariable("buyerId") Long buyerId)
    {
        JSONArray transactions = new JSONArray();
        List<Double[]> transItemByBuyerId = transItemRepository.getTransItemByBuyerId(buyerId);

        for (Double[] detail : transItemByBuyerId)
        {
            JSONObject transaction = new JSONObject();
            transaction.put("transaction_id", detail[0]);
            transaction.put("listing_id", detail[1]);
            transaction.put("price", detail[2]);

            transactions.put(transaction);
        }

        return ResponseEntity.ok(transactions.toString());
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
        transItemRepository.deleteAllByTransactionId(transId);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
