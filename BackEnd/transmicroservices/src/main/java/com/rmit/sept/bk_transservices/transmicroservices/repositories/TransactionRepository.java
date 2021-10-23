package com.rmit.sept.bk_transservices.transmicroservices.repositories;

import com.rmit.sept.bk_transservices.transmicroservices.model.Transaction;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TransactionRepository extends CrudRepository<Transaction, Long>
{
    List<Transaction> getTransactionByBuyerId(Long buyerId);
}
