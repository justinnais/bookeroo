package com.rmit.sept.bk_bookservices.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import com.rmit.sept.bk_bookservices.model.Book;
import com.rmit.sept.bk_bookservices.repositories.BookRepository;
import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import static com.mashape.unirest.http.Unirest.get;

@Service
public class BookService {

    private static final Logger log = Logger.getLogger(BookService.class);

    @Value("${isbndb.key}")
    private String isbndbKey;

    @Value("${isbndb.url}")
    private String isbndbUrl;

    @Autowired
    private BookRepository bookRepository;


    public Book findByIsbn(String isbn) {

        Book book;
        if (isbn.length() == 10) {
            book = bookRepository.findByIsbn(isbn);
        } else {
            book = bookRepository.findByIsbn13(isbn);
        }


        if (book == null) {
            log.warn("Couldn't find book with isbn: " + isbn + ", checking isbndb");

            try {
                HttpResponse<JsonNode> response = Unirest.get(isbndbUrl+"/book/"+isbn).header("Authorization",isbndbKey).asJson();

                if (response.getStatus() == 404) {
                    log.error("Book not found, returning null");
                    return null;
                } else {

                    book = Book.fromJson(response.getBody().getObject());

                    log.info("Found book: "+ book.getTitle() +", saving!");

                    bookRepository.save(book);


                }

            } catch (UnirestException | JsonProcessingException e) {
                e.printStackTrace();
            }

        }


        return book;


    }


}
