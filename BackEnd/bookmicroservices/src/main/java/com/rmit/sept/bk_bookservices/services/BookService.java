package com.rmit.sept.bk_bookservices.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import com.rmit.sept.bk_bookservices.model.Book;
import com.rmit.sept.bk_bookservices.repositories.BookRepository;
import org.jboss.logging.Logger;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;


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

                if (response.getStatus() != 200) {
                    log.error("Book not found, returning null");
                    return null;
                } else {

                    book = Book.fromJson(response.getBody().getObject().getJSONObject("book"));

                    log.info("Found book: "+ book.getTitle() +", saving!");

                    bookRepository.save(book);


                }

            } catch (UnirestException | JsonProcessingException e) {
                e.printStackTrace();
            }

        }


        return book;


    }

    public Set<Book> getAll() {

        Set<Book> titles = new HashSet<>();

        titles.addAll(bookRepository.findAll());

        return titles;




    }

    @Transactional
    public Set<Book> searchByTitle(String title) {
        Set<Book> titles = new HashSet<>();
        titles.addAll(bookRepository.findByTitleLike("%"+title+"%"));
        titles.addAll(bookRepository.findByTitleLongLike("%"+title+"%"));

        log.info("No books in database, checking isbndb");

        try {
            HttpResponse<JsonNode> response = Unirest.get(isbndbUrl+"/books/"+title+"?page=1&pageSize=100").header("Authorization",isbndbKey).asJson();

            if (response.getStatus() != 200) {
                log.error("Got no books from isbndb!");
            } else {
                JSONArray bookJsons = response.getBody().getObject().getJSONArray("books");

                for (int i = 0; i < bookJsons.length(); i++) {
                    JSONObject bookJson = bookJsons.getJSONObject(i);
                    Book book = Book.fromJson(bookJson);

                    bookRepository.save(book);
                    titles.add(book);


                }
            }

        } catch (UnirestException | JsonProcessingException e) {
            e.printStackTrace();
        }


        return titles;


    }


}
