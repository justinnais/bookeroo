package com.rmit.sept.bk_reviewservices.controllers;

import com.rmit.sept.bk_reviewservices.exceptions.BadReviewScoreException;
import com.rmit.sept.bk_reviewservices.exceptions.BadReviewTextException;
import com.rmit.sept.bk_reviewservices.exceptions.DuplicateReviewException;
import com.rmit.sept.bk_reviewservices.model.BookReview;
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
@CrossOrigin(origins = "http://localhost:3000")
public class ReviewController
{
    @Autowired
    private BookReviewService bookReviewService;

    @Autowired
    private BookReviewRepository bookReviewRepository;

    @Autowired
    private UserReviewRepository userReviewRepository;

    @GetMapping("/book")
    public ResponseEntity<?> listBookReviews()
    {
        return new ResponseEntity<>(bookReviewRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<?> listUserReviews()
    {
        return new ResponseEntity<>(userReviewRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/book/{isbn}")
    public ResponseEntity<?> getBookReviewsByBook(@PathVariable String isbn)
    {
        return new ResponseEntity<>(bookReviewService.listReviewsForBook(isbn), HttpStatus.OK);
    }

    @GetMapping("/user/{reviewedUserId}")
    public ResponseEntity<?> getUserReviewByReviewed(@PathVariable Long reviewedUserId)
    {
        return new ResponseEntity<>(userReviewRepository.findUserReviewsByReviewedUserId(reviewedUserId), HttpStatus.OK);
    }

    @GetMapping("/book/byUser/{userId}")
    public ResponseEntity<?> getBookReviewsByUser(@PathVariable Long userId)
    {
        return new ResponseEntity<>(bookReviewService.listReviewsForUser(userId), HttpStatus.OK);
    }

    @GetMapping("/user/byUser/{reviewerUserId}")
    public ResponseEntity<?> getUserReviewsByReviewer(@PathVariable Long reviewerUserId)
    {
        return new ResponseEntity<>(userReviewRepository.findUserReviewsByReviewerUserId(reviewerUserId), HttpStatus.OK);
    }

    @PostMapping("/post")
    public ResponseEntity<?> postReview(@Valid @RequestBody BookReview bookReview)
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
}
