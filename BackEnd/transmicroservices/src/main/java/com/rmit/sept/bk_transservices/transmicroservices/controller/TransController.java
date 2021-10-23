package com.rmit.sept.bk_transservices.transmicroservices.controller;

import com.paypal.http.HttpResponse;
import com.paypal.payments.Refund;
import com.rmit.sept.bk_transservices.transmicroservices.model.RefundOrder;
import com.rmit.sept.bk_transservices.transmicroservices.model.Status;
import com.rmit.sept.bk_transservices.transmicroservices.model.Transaction;
import com.rmit.sept.bk_transservices.transmicroservices.repositories.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/trans")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080", "https://bookeroo" +
        ".danieljmills.com"})
public class TransController
{
    @Autowired
    TransactionRepository transactionRepository;

    /**
     * Endpoint for creating new {@link Transaction} entities
     *
     * @param transaction Transaction representing body of the request
     */
    @PostMapping("/create")
    public ResponseEntity<?> createTransaction(@RequestBody Transaction transaction)
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
        if (transaction.getCaptureId() == null)
            return new ResponseEntity<>("captureId property required", HttpStatus.BAD_REQUEST);

        transactionRepository.save(transaction);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * Endpoint to return all the transactions in the system
     */
    @GetMapping(value = "")
    public ResponseEntity<?> listTransactions()
    {
        return new ResponseEntity<>(transactionRepository.findAll(), HttpStatus.OK);
    }

    /**
     * Endpoint for retrieving a specific transaction by its id
     *
     * @param transId Id of transaction to return
     */
    @GetMapping(value = "/{transId}")
    public ResponseEntity<?> getTransaction(@PathVariable Long transId)
    {
        Optional<Transaction> transaction = transactionRepository.findById(transId);

        if (transaction.isEmpty())
            return new ResponseEntity<>("No transaction exists with that id", HttpStatus.NOT_FOUND);
        else
            return new ResponseEntity<>(transaction.get(), HttpStatus.OK);
    }

    /**
     * Endpoint for returning all transactions made by a user
     *
     * @param buyerId Id of the user
     */
    @GetMapping(value = "/user/{buyerId}")
    public ResponseEntity<?> listUsersTransactions(@PathVariable("buyerId") Long buyerId)
    {
        List<Transaction> transactions = transactionRepository.getTransactionByBuyerId(buyerId);
        return ResponseEntity.ok(transactions);
    }

    /**
     * Endpoint for refunding transactions
     *
     * @param transId Id of transaction to return
     */
    @PutMapping("/refund/{transId}")
    public ResponseEntity<?> refundTransaction(@PathVariable("transId") Long transId)
    {
        Optional<Transaction> transResult = transactionRepository.findById(transId);
        if (transResult.isEmpty())
            return new ResponseEntity<>("No transaction exists with that id", HttpStatus.NOT_FOUND);
        Transaction transaction = transResult.get();

        // Test to see if the transaction occurred more than 2 hours ago
        long currentTime = new Date().getTime();
        long diff = currentTime - transaction.getDatetime().getTime();
        if (diff > 7200000)
            return new ResponseEntity<>("More than 2 hours have elapsed since this transaction " +
                    "was made", HttpStatus.LOCKED);

        // Query PayPal to attempt a refund
        HttpResponse<Refund> refund;
        try
        {
            refund = RefundOrder.refundOrder(transaction.getCaptureId(), transaction.getPrice());
        } catch (IOException e)
        {
            return new ResponseEntity<>("Exception occured when refunding order:\n" + e.getMessage(),
                    HttpStatus.EXPECTATION_FAILED);
        }

        transaction.setStatus(Status.CANCELLED);
        transactionRepository.save(transaction);

        return new ResponseEntity<>(refund.result(), HttpStatus.OK);
    }
}
