package com.rmit.sept.bk_reviewservices.repositories;

import com.rmit.sept.bk_reviewservices.model.BookReview;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookReviewRepository extends CrudRepository<BookReview, Long>
{
    List<BookReview> findByBookIsbn(String bookIsbn);

    List<BookReview> findByUserId(Long userId);

    BookReview findByUserIdAndBookIsbn(Long userId, String bookIsbn);

    List<BookReview> findAll();
}
