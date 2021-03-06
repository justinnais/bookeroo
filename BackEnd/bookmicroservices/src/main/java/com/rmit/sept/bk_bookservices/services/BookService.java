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


/**
 * Handles saving and getting {@link Book}s from the {@link BookRepository}
 * Also handles getting books from ISBNDB
 */
@Service
public class BookService
{
    private static final Logger log = Logger.getLogger(BookService.class);

    @Value("${isbndb.key}")
    private String isbndbKey;

    @Value("${isbndb.url}")
    private String isbndbUrl;

    @Autowired
    private BookRepository bookRepository;

    /**
     * @return {@link BookRepository#findAll()}
     */
    public Set<Book> listBooks()
    {
        return new HashSet<>(bookRepository.findAll());
    }

    /**
     * Calls {@link BookRepository#findByIsbn(String)} or {@link BookRepository#findByIsbn13(String)},
     * and if the book is null, then calls it from ISBNDB
     * @param isbn - isbn to search on
     * @return - Book object, or null if not founds
     */
    public Book getBook(String isbn)
    {
        Book book;
        if (isbn.length() == 10)
            book = bookRepository.findByIsbn(isbn);
        else
            book = bookRepository.findByIsbn13(isbn);

        if (book == null)
        {
            log.warn("Couldn't find book with isbn: " + isbn + ", checking isbndb");
            try
            {
                HttpResponse<JsonNode> response = Unirest.get(isbndbUrl + "/book/" + isbn)
                        .header("Authorization", isbndbKey).asJson();
                if (response.getStatus() != 200)
                {
                    log.error("Book not found, returning null");
                    return null;
                } else
                {
                    book = Book.fromJson(response.getBody().getObject().getJSONObject("book"));
                    log.info("Found book: " + book.getTitle() + ", saving!");
                    bookRepository.save(book);
                }
            } catch (UnirestException | JsonProcessingException e)
            {
                e.printStackTrace();
            }
        }
        return book;
    }

    /**
     * Searches books by title, and retrieves more from ISBNDB.
     * Deprecated, the frontend now handles this.
     * Used to import books into the system for testing now.
     * @param title - title to search on
     * @return {@link Set} of {@link Book}s
     */
    @Deprecated
    @Transactional
    public Set<Book> searchByTitle(String title)
    {
        Set<Book> titles = new HashSet<>();
        titles.addAll(bookRepository.findByTitleLike("%" + title + "%"));
        titles.addAll(bookRepository.findByTitleLongLike("%" + title + "%"));

        log.info("No books in database, checking isbndb");

        try
        {
            HttpResponse<JsonNode> response = Unirest
                    .get(isbndbUrl + "/books/" + title + "?page=1&pageSize=100")
                    .header("Authorization", isbndbKey).asJson();

            if (response.getStatus() != 200)
                log.error("Got no books from isbndb!");
            else
            {
                JSONArray bookJsons = response.getBody().getObject().getJSONArray("books");

                for (int i = 0; i < bookJsons.length(); i++)
                {
                    JSONObject bookJson = bookJsons.getJSONObject(i);
                    Book book = Book.fromJson(bookJson);

                    if (bookRepository.findByIsbn(book.getIsbn()) == null)
                        bookRepository.save(book);

                    titles.add(book);
                }
            }
        } catch (UnirestException | JsonProcessingException e)
        {
            e.printStackTrace();
        }
        return titles;
    }
}
