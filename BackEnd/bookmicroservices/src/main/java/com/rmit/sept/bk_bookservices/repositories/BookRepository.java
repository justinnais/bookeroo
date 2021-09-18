package com.rmit.sept.bk_bookservices.repositories;

import com.rmit.sept.bk_bookservices.model.Book;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends CrudRepository<Book, String>
{
    Book findByIsbn(String isbn);

    Book findByIsbn13(String isbn13);

    List<Book> findAll();

    List<Book> findByTitleLike(String title);

    List<Book> findByTitleLongLike(String titleLong);
}
