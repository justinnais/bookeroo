package com.rmit.sept.bk_reviewservices.services;

import com.rmit.sept.bk_reviewservices.exceptions.BadReviewScoreException;
import com.rmit.sept.bk_reviewservices.exceptions.BadReviewTextException;
import com.rmit.sept.bk_reviewservices.exceptions.DuplicateReviewException;
import com.rmit.sept.bk_reviewservices.model.Review;
import com.rmit.sept.bk_reviewservices.repositories.ReviewRepository;
import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class ReviewService
{
    private static final Logger log = Logger.getLogger(ReviewService.class);

    @Autowired
    private ReviewRepository reviewRepository;

    public Set<Review> listReviews()
    {
        return new HashSet<>(reviewRepository.findAll());
    }

    public Set<Review> listReviewsForBook(String isbn)
    {
        return new HashSet<>(reviewRepository.findByBookIsbn(isbn));
    }

    public Set<Review> listReviewsForUser(Long userId)
    {
        return new HashSet<>(reviewRepository.findByUserId(userId));
    }

    public Review postReview(Review review) throws DuplicateReviewException,
            BadReviewScoreException, BadReviewTextException
    {
        if (reviewRepository.findByUserIdAndBookIsbn(review.getUserId(), review.getBookIsbn()) != null)
            throw new DuplicateReviewException("User has already reviewed this book");

        if (review.getScore() > Review.MAX_SCORE || review.getScore() < 0.0)
            throw new BadReviewScoreException("Score must be between 0.0 and 5.0");

        if (review.getReview().length() > Review.MAX_LENGTH)
            throw new BadReviewTextException("Review is too long, must be less than 240 " +
                    "characters");

        return reviewRepository.save(review);
    }
}
