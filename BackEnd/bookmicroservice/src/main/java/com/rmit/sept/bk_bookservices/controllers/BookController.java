package com.rmit.sept.bk_bookservices.controllers;

import com.rmit.sept.bk_bookservices.model.Book;
import com.rmit.sept.bk_bookservices.services.BookService;
import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins="http://localhost:3000")
public class BookController {

    private static final Logger log = Logger.getLogger(BookController.class);

    @Autowired
    private BookService bookService;

    @GetMapping("/{isbn}")
    public ResponseEntity<?> findByIsbn(@PathVariable String isbn) {

        log.info("Got request for " + isbn);

        if (isbn.length() != 10 && isbn.length() != 13) {
            return new ResponseEntity<>("ISBN must be 10 or 13 characters", HttpStatus.BAD_REQUEST);
        }

        Book book = bookService.findByIsbn(isbn);


        return new ResponseEntity<>(book, HttpStatus.OK);

    }


}
