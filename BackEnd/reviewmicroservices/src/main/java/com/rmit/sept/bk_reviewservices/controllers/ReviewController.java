package com.rmit.sept.bk_reviewservices.controllers;

import com.rmit.sept.bk_reviewservices.exceptions.BadReviewScoreException;
import com.rmit.sept.bk_reviewservices.exceptions.BadReviewTextException;
import com.rmit.sept.bk_reviewservices.exceptions.DuplicateReviewException;
import com.rmit.sept.bk_reviewservices.model.BookReview;
import com.rmit.sept.bk_reviewservices.model.UserReview;
import com.rmit.sept.bk_reviewservices.repositories.BookReviewRepository;
import com.rmit.sept.bk_reviewservices.repositories.UserReviewRepository;
import com.rmit.sept.bk_reviewservices.services.BookReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@RestController
@RequestMapping("/api/review")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080", "https://bookeroo" +
        ".danieljmills.com"})
public class ReviewController
{
    @Autowired
    private BookReviewService bookReviewService;

    @Autowired
    private BookReviewRepository bookReviewRepository;

    @Autowired
    private UserReviewRepository userReviewRepository;

    /**
     * Endpoint to list all book reviews
     */
    @GetMapping("/book")
    public ResponseEntity<?> listBookReviews()
    {
        return new ResponseEntity<>(bookReviewRepository.findAll(), HttpStatus.OK);
    }

    /**
     * Endpoint to list all user reviews
     */
    @GetMapping("/user")
    public ResponseEntity<?> listUserReviews()
    {
        return new ResponseEntity<>(userReviewRepository.findAll(), HttpStatus.OK);
    }

    /**
     * Endpoint to get all book reviews for a specific book
     *
     * @param isbn ISBN of book
     */
    @GetMapping("/book/{isbn}")
    public ResponseEntity<?> getBookReviewsByBook(@PathVariable String isbn)
    {
        return new ResponseEntity<>(bookReviewRepository.findByBookIsbn(isbn), HttpStatus.OK);
    }

    /**
     * Endpoint to get all user reviews by the id of the reviewed user
     *
     * @param reviewedUserId id of the reviewed user
     */
    @GetMapping("/user/{reviewedUserId}")
    public ResponseEntity<?> getUserReviewByReviewed(@PathVariable Long reviewedUserId)
    {
        return new ResponseEntity<>(userReviewRepository.findUserReviewsByReviewedUserId(reviewedUserId), HttpStatus.OK);
    }

    /**
     * Endpoint to get all book reviews made by a specific user
     *
     * @param userId id of reviewer
     */
    @GetMapping("/book/byUser/{userId}")
    public ResponseEntity<?> getBookReviewsByUser(@PathVariable Long userId)
    {
        return new ResponseEntity<>(bookReviewRepository.findByUserId(userId), HttpStatus.OK);
    }

    /**
     * Endpoint to get all user reviews made by a specific user
     *
     * @param reviewerUserId id of reviewer
     */
    @GetMapping("/user/byUser/{reviewerUserId}")
    public ResponseEntity<?> getUserReviewsByReviewer(@PathVariable Long reviewerUserId)
    {
        return new ResponseEntity<>(userReviewRepository.findUserReviewsByReviewerUserId(reviewerUserId), HttpStatus.OK);
    }

    /**
     * Endpoint to create new book reviews
     *
     * @param bookReview Object representation of the body of the API request
     */
    @PostMapping("/book/post")
    public ResponseEntity<?> postBookReview(@Valid @RequestBody BookReview bookReview)
    {
        if (bookReview.getBookIsbn() == null)
            return new ResponseEntity<>("bookIsbn parameter is required", HttpStatus.BAD_REQUEST);

        try
        {
            bookReviewService.postReview(bookReview);
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

        return new ResponseEntity<>(bookReview, HttpStatus.CREATED);
    }

    /**
     * Endpoint to create new user reviews
     *
     * @param userReview Object representation of the body of the API request
     */
    @PostMapping("/user/post")
    public ResponseEntity<?> postUserReview(@RequestBody UserReview userReview)
    {
        if (userReview.getReviewId() != null)
            return new ResponseEntity<>("Request cannot contain reviewId", HttpStatus.BAD_REQUEST);
        else if (userReview.getReviewerUserId() == null)
            return new ResponseEntity<>("reviewerUserId parameter is required",
                    HttpStatus.BAD_REQUEST);
        else if (userReview.getReviewedUserId() == null)
            return new ResponseEntity<>("reviewedUserId parameter is required",
                    HttpStatus.BAD_REQUEST);
        else if (userReview.getScore() == null)
            return new ResponseEntity<>("score parameter is required", HttpStatus.BAD_REQUEST);

        return new ResponseEntity<>(userReviewRepository.save(userReview), HttpStatus.CREATED);
    }
}
