package com.rmit.sept.bk_bookservices.controllers;

import com.rmit.sept.bk_bookservices.model.Book;
import com.rmit.sept.bk_bookservices.repositories.BookRepository;
import com.rmit.sept.bk_bookservices.services.BookService;
import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/book")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080","https://bookeroo.danieljmills.com"})
public class BookController
{
    private static final Logger log = Logger.getLogger(BookController.class);

    @Autowired
    private BookService bookService;

    @Autowired
    private BookRepository bookRepository;

    // LIST
    @GetMapping("")
    public ResponseEntity<?> listBooks()
    {
        return new ResponseEntity<>(bookService.listBooks(), HttpStatus.OK);
    }

    // GET
    @GetMapping("/{isbn}")
    public ResponseEntity<?> getBook(@PathVariable String isbn)
    {
        log.info("Get request for " + isbn);

        if (isbn.length() != 10 && isbn.length() != 13)
            return new ResponseEntity<>("ISBN must be 10 or 13 characters", HttpStatus.BAD_REQUEST);

        Book book = bookService.getBook(isbn);

        if (book == null)
            return new ResponseEntity<>("No book exists with this isbn", HttpStatus.NOT_FOUND);

        return new ResponseEntity<>(book, HttpStatus.OK);
    }

    @GetMapping("/search/title/{title}")
    public ResponseEntity<?> searchByTitle(@PathVariable String title)
    {
        Set<Book> books = bookService.searchByTitle(title);

        if (books.size() > 0)
            return new ResponseEntity<>(books, HttpStatus.OK);
        else
            return new ResponseEntity<>("No books found", HttpStatus.NOT_FOUND);
    }

    @PatchMapping("/{isbn}")
    public ResponseEntity<?> updateBook(@PathVariable String isbn, @RequestBody Book book)
    {
        if (isbn.length() != 10 && isbn.length() != 13)
            return new ResponseEntity<>("ISBN must be 10 or 13 characters", HttpStatus.BAD_REQUEST);

        Book oldBook = bookRepository.findByIsbn(isbn);

        if (book == null)
            return new ResponseEntity<>("No book exists with this isbn", HttpStatus.NOT_FOUND);

        if (book.getIsbn() != null)
            oldBook.setIsbn(book.getIsbn());
        if (book.getIsbn13() != null)
            oldBook.setIsbn13(book.getIsbn13());
        if (book.getTitle() != null)
            oldBook.setTitle(book.getTitle());
        if (book.getTitleLong() != null)
            oldBook.setTitleLong(book.getTitleLong());
        if (book.getBinding() != null)
            oldBook.setBinding(book.getBinding());
        if (book.getPublisher() != null)
            oldBook.setPublisher(book.getPublisher());
        if (book.getLanguage() != null)
            oldBook.setLanguage(book.getLanguage());
        if (book.getDatePublished() != null)
            oldBook.setDatePublished(book.getDatePublished());
        if (book.getEdition() != null)
            oldBook.setEdition(book.getEdition());
        if (book.getPages() != null)
            oldBook.setPages(book.getPages());
        if (book.getDimensions() != null)
            oldBook.setDimensions(book.getDimensions());
        if (book.getImage() != null)
            oldBook.setImage(book.getImage());
        if (book.getSynopsys() != null)
            oldBook.setSynopsys(book.getSynopsys());
        if (book.getAuthors() != null)
            oldBook.setAuthors(book.getAuthors());

        bookRepository.save(oldBook);

        return ResponseEntity.ok(oldBook);
    }


}
