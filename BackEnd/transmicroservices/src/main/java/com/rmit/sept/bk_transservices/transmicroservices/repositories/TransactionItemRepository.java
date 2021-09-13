package com.rmit.sept.bk_transservices.transmicroservices.repositories;

import com.rmit.sept.bk_transservices.transmicroservices.model.TransactionItem;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionItemRepository extends CrudRepository<TransactionItem, Long>
{
    @Query("SELECT ti.transactionId, ti.listingId, ti.amount " +
            "FROM TransactionItem ti " +
            "JOIN Transaction t ON t.transactionId = ti.transactionId " +
            "WHERE t.buyerId = :buyerId")
    List<Double[]> getTransItemByBuyerId(@Param("buyerId") Long buyerId);
    // TODO: Create an object to hold the response rather than using an array
}
