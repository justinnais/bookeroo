package com.rmit.sept.bk_transservices.transmicroservices.repositories;

import com.rmit.sept.bk_transservices.transmicroservices.model.TransactionItem;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionItemRepository extends CrudRepository<TransactionItem, Long>
{
}
