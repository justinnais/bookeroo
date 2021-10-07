package com.rmit.sept.bk_bookservices.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.JSONObject;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@JsonIgnoreProperties(ignoreUnknown = true)
public class Book
{
    @Id
    private String isbn;

    @Column(unique = true)
    private String isbn13;

    private String title;

    @JsonProperty("title_long")
    private String titleLong;

    private String binding;

    private String publisher;

    private String language;

    @JsonProperty("date_published")
    private String datePublished;

    private String edition;

    private int pages;

    private String dimensions;

    private String image;

    @Column(columnDefinition = "TEXT")
    private String synopsys;

    private String authors;

    public Book()
    {
    }

    public static Book fromJson(JSONObject json) throws JsonProcessingException
    {
        String authors = "Unknown";

        if (json.has("authors"))
            authors = json.getJSONArray("authors").join("|").replaceAll("\\\"", "");

        json.remove("authors");

        ObjectMapper objectMapper = new ObjectMapper();
        Book book = objectMapper.readValue(json.toString(), Book.class);
        book.setAuthors(authors);

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
