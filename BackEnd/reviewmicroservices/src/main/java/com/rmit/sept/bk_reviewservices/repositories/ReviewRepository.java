package com.rmit.sept.bk_reviewservices.repositories;

import com.rmit.sept.bk_reviewservices.model.Review;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends CrudRepository<Review, Long> {

    List<Review> findByBookIsbn(String bookIsbn);
    List<Review> findByUserId(Long userId);
    Review findByUserIdAndBookIsbn(Long userId, String bookIsbn);
    List<Review> findAll();


}
