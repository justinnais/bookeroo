package com.rmit.sept.bk_bookservices.repositories;

import com.rmit.sept.bk_bookservices.model.Book;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * CRUD repository for accessing {@link Book}s
 */
@Repository
public interface BookRepository extends CrudRepository<Book, String>
{
    /**
     * Gets a {@link Book} by isbn
     * @param isbn {@link String} isbn of book
     * @return Book object or null
     */
    Book findByIsbn(String isbn);

    /**
     * Gets a {@link Book} by isbn13
     * @param isbn13 {@link String} isbn13 of book
     * @return Book object or null
     */
    Book findByIsbn13(String isbn13);

    /**
     * @return {@link List} of all {@link Book}s in the system
     */
    List<Book> findAll();

    /**
     * Finds {@link Book}s with a title LIKE (SQL) the given title
     * @param title - Title to search on
     * @return {@link List} of books
     */
    @Deprecated
    List<Book> findByTitleLike(String title);

    /**
     * Finds {@link Book}s with a titleLong LIKE (SQL) the given titleLong
     * @param titleLong - Title to search on
     * @return {@link List} of books
     */
    @Deprecated
    List<Book> findByTitleLongLike(String titleLong);
}
