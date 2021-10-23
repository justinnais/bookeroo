package com.rmit.sept.bk_bookservices.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.JSONObject;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * Represents a book within the system.
 * Based primarily on the ISBNDB system
 */
@Entity
@JsonIgnoreProperties(ignoreUnknown = true)
public class Book
{
    /**
     * The maximum tags a book can have
     */
    public static int MAX_TAGS = 5;

    /**
     * The isbn10 of the book. Unique
     */
    @Id
    private String isbn;

    /**
     * The isbn13 of the book. Unique
     */
    @Column(unique = true)
    private String isbn13;

    /**
     * The short title of the book
     */
    private String title;

    /**
     * The long title of the book
     */
    @JsonProperty("title_long")
    private String titleLong;

    /**
     * How the book is bound, eg: paperback, hardcover
     */
    private String binding;

    /**
     * The publisher of the book
     */
    private String publisher;

    /**
     * The language the book is written in. In two letter format, eg: EN
     */
    private String language;

    /**
     * The date the book was published. ISBNDB does not stick to one format, so cannot be {@link java.time.LocalDateTime}
     */
    @JsonProperty("date_published")
    private String datePublished;

    /**
     * Which edition of the book this is
     */
    private String edition;

    /**
     * The amount of pages in the book
     */
    private int pages;

    /**
     * The physical dimensions of the book, can be inconsistent thanks to ISBNDB
     */
    private String dimensions;

    /**
     * A url pointing to the ISBNDB image used for this book
     */
    private String image;

    /**
     * A paragraph describing the book. Sometimes in HTML format
     */
    @Column(columnDefinition = "TEXT")
    private String synopsys;

    /**
     * A list of authors seperated by |
     */
    private String authors;

    /**
     * A list of tags seperated by |
     */
    private String tags;

    /**
     * A table of contents in json format.
     */
    @JsonProperty("table_of_contents")
    private String tableOfContents;

    public Book()
    {
        setTableOfContents("{\"Chapter 1\":\"The Start\",\"Chapter 2\":\"The Middle\",\"Chapter 3\":\"The End\"}");
    }

    /**
     * Takes a {@link JSONObject} and converts it to a {@link Book}
     * @param json - Json object to convert
     * @return - a new Book object
     * @throws JsonProcessingException - if the json is invalid
     */
    public static Book fromJson(JSONObject json) throws JsonProcessingException
    {
        //Start by separating out the author and tags,
        //so they can be stored within a field each in the db
        String authors = "Unknown";
        String tags = "";

        if (json.has("authors"))
            authors = json.getJSONArray("authors").join("|").replaceAll("\\\"", "");

        json.remove("authors");

        if (json.has("subjects")) {
            int count = 0;
            for (int i = 0; i < json.getJSONArray("subjects").length(); i++) {
                Object tag = json.getJSONArray("subjects").get(i);
                if (tag instanceof String) {
                    if (tags.length() != 0) {
                        tags = tags + "|";
                    }
                    tags = tags+(String) tag;
                    count++;
                    if (count >= MAX_TAGS) {
                        break;
                    }
                }
            }
        }

        json.remove("subjects");

        //Create the book

        ObjectMapper objectMapper = new ObjectMapper();
        Book book = objectMapper.readValue(json.toString(), Book.class);

        //Add the tags and authors back onto the book
        book.setAuthors(authors);
        book.setTags(tags);

        return book;
    }

    public String getIsbn()
    {
        return isbn;
    }

    public void setIsbn(String isbn)
    {
        this.isbn = isbn;
    }

    public String getIsbn13()
    {
        return isbn13;
    }

    public void setIsbn13(String isbn13)
    {
        this.isbn13 = isbn13;
    }

    public String getTitle()
    {
        return title;
    }

    public void setTitle(String title)
    {
        this.title = title;
    }

    public String getTitleLong()
    {
        return titleLong;
    }

    public void setTitleLong(String titleLong)
    {
        this.titleLong = titleLong;
    }

    public String getBinding()
    {
        return binding;
    }

    public void setBinding(String binding)
    {
        this.binding = binding;
    }

    public String getPublisher()
    {
        return publisher;
    }

    public void setPublisher(String publisher)
    {
        this.publisher = publisher;
    }

    public String getLanguage()
    {
        return language;
    }

    public void setLanguage(String language)
    {
        this.language = language;
    }

    public String getDatePublished()
    {
        return datePublished;
    }

    public void setDatePublished(String datePublished)
    {
        this.datePublished = datePublished;
    }

    public String getEdition()
    {
        return edition;
    }

    public void setEdition(String edition)
    {
        this.edition = edition;
    }

    public Integer getPages()
    {
        return pages;
    }

    public void setPages(int pages)
    {
        this.pages = pages;
    }

    public String getDimensions()
    {
        return dimensions;
    }

    public void setDimensions(String dimensions)
    {
        this.dimensions = dimensions;
    }

    public String getImage()
    {
        return image;
    }

    public void setImage(String image)
    {
        this.image = image;
    }

    public String getSynopsys()
    {
        return synopsys;
    }

    public void setSynopsys(String synopsys)
    {
        this.synopsys = synopsys;
    }

    public String getAuthors()
    {
        return authors;
    }

    public void setAuthors(String authors)
    {
        this.authors = authors;
    }

    public String getTags() {
        return tags;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }

    public String getTableOfContents() {
        return tableOfContents;
    }

    public void setTableOfContents(String tableOfContents) {
        this.tableOfContents = tableOfContents;
    }

    @Override
    public boolean equals(Object other)
    {
        return (other.hashCode() == this.hashCode());
    }

    @Override
    public int hashCode()
    {
        return this.isbn.hashCode();
    }
}
