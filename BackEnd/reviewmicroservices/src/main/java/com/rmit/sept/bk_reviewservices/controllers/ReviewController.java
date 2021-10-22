package com.rmit.sept.bk_reviewservices.controllers;

import com.rmit.sept.bk_reviewservices.exceptions.BadReviewScoreException;
import com.rmit.sept.bk_reviewservices.exceptions.BadReviewTextException;
import com.rmit.sept.bk_reviewservices.exceptions.DuplicateReviewException;
import com.rmit.sept.bk_reviewservices.model.BookReview;
import com.rmit.sept.bk_reviewservices.repositories.BookReviewRepository;
import com.rmit.sept.bk_reviewservices.services.BookReviewService;
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
    @Autowired
    private BookReviewService bookReviewService;

    @Autowired
    private BookReviewRepository bookReviewRepository;

    @GetMapping("/{type}")
    public ResponseEntity<?> listReviews(@PathVariable("type") String type)
    {
        if (type.equals("book"))
            return new ResponseEntity<>(bookReviewRepository.findAll(), HttpStatus.OK);
//        else if (type.equals("user"))
//            return new ResponseEntity<>()
    }

    @GetMapping("/{isbn}")
    public ResponseEntity<?> getReviewsByBook(@PathVariable String isbn)
    {
        Set<BookReview> bookReviews = bookReviewService.listReviewsForBook(isbn);
        return new ResponseEntity<>(bookReviews, HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getReviewsByUser(@PathVariable Long userId)
    {
        Set<BookReview> bookReviews = bookReviewService.listReviewsForUser(userId);
        return new ResponseEntity<>(bookReviews, HttpStatus.OK);
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
