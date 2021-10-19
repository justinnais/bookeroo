package com.rmit.sept.bk_reviewservices.controllers;

import com.rmit.sept.bk_reviewservices.exceptions.BadReviewScoreException;
import com.rmit.sept.bk_reviewservices.exceptions.BadReviewTextException;
import com.rmit.sept.bk_reviewservices.exceptions.DuplicateReviewException;
import com.rmit.sept.bk_reviewservices.model.Review;
import com.rmit.sept.bk_reviewservices.services.ReviewService;
import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Set;


@RestController
@RequestMapping("/api/review")
@CrossOrigin(origins = "http://localhost:3000")
public class ReviewController
{

    private static final Logger log = Logger.getLogger(ReviewController.class);

    @Autowired
    private ReviewService reviewService;

    @GetMapping("")
    public ResponseEntity<?> listReviews()
    {
        return new ResponseEntity<>(reviewService.listReviews(), HttpStatus.OK);
    }

    @GetMapping("/{isbn}")
    public ResponseEntity<?> getReviewsByBook(@PathVariable String isbn)
    {
        Set<Review> reviews = reviewService.listReviewsForBook(isbn);

        //TODO: See if Justin wants an error code for this
        
//         if (reviews.size() == 0) {
//
//         }

        return new ResponseEntity<>(reviews, HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getReviewsByUser(@PathVariable Long userId)
    {
        Set<Review> reviews = reviewService.listReviewsForUser(userId);
        return new ResponseEntity<>(reviews, HttpStatus.OK);
    }

    @PostMapping("/post")
    public ResponseEntity<?> postReview(@Valid @RequestBody Review review)
    {
        try
        {
            reviewService.postReview(review);
        } catch (DuplicateReviewException e)
        {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        } catch (BadReviewTextException e)
        {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.PAYLOAD_TOO_LARGE);
        } catch (BadReviewScoreException e)
        {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(review, HttpStatus.CREATED);
    }
}
