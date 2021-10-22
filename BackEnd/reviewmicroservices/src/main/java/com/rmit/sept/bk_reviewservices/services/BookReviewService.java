package com.rmit.sept.bk_reviewservices.services;

import com.rmit.sept.bk_reviewservices.exceptions.BadReviewScoreException;
import com.rmit.sept.bk_reviewservices.exceptions.BadReviewTextException;
import com.rmit.sept.bk_reviewservices.exceptions.DuplicateReviewException;
import com.rmit.sept.bk_reviewservices.model.BookReview;
import com.rmit.sept.bk_reviewservices.repositories.BookReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class BookReviewService
{
    @Autowired
    private BookReviewRepository bookReviewRepository;

    public Set<BookReview> listReviewsForBook(String isbn)
    {
        return new HashSet<>(bookReviewRepository.findByBookIsbn(isbn));
    }

    public Set<BookReview> listReviewsForUser(Long userId)
    {
        return new HashSet<>(bookReviewRepository.findByUserId(userId));
    }

    public void postReview(BookReview bookReview) throws DuplicateReviewException,
            BadReviewScoreException, BadReviewTextException
    {
        if (bookReviewRepository.findByUserIdAndBookIsbn(bookReview.getUserId(), bookReview.getBookIsbn()) != null)
            throw new DuplicateReviewException("User has already reviewed this book");

        if (bookReview.getScore() > BookReview.MAX_SCORE || bookReview.getScore() < 0.0)
            throw new BadReviewScoreException("Score must be between 0.0 and 5.0");


        String reviewText = bookReview.getReview();
        if (reviewText != null && reviewText.length() > BookReview.MAX_LENGTH)
            throw new BadReviewTextException("Review is too long, must be less than 240 " +
                    "characters");

        bookReviewRepository.save(bookReview);
    }
}
