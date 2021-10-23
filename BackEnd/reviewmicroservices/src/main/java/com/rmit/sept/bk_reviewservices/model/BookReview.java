package com.rmit.sept.bk_reviewservices.model;


import javax.persistence.*;

/**
 * Representation of the BookReview entity in the system
 */
@Entity
public class BookReview
{
    /**
     * Maximum value of the score
     */
    public static double MAX_SCORE = 5.0;
    /**
     * Maximum character length of the review text
     */
    public static int MAX_LENGTH = 240;

    /**
     * Unique identifier for the BookReview object
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;
    /**
     * Id of the user who created the review
     */
    private Long userId;
    /**
     * ISBN of the book for which the review relates
     */
    private String bookIsbn;
    /**
     * Numerical score given as part of the review
     */
    private double score;
    /**
     * Review text associated with the review
     */
    @Column(columnDefinition = "TEXT")
    private String review;

    public BookReview()
    {
    }

    public Long getReviewId()
    {
        return reviewId;
    }

    public void setReviewId(Long reviewId)
    {
        this.reviewId = reviewId;
    }

    public Long getUserId()
    {
        return userId;
    }

    public void setUserId(Long userId)
    {
        this.userId = userId;
    }

    public String getBookIsbn()
    {
        return bookIsbn;
    }

    public void setBookIsbn(String bookIsbn)
    {
        this.bookIsbn = bookIsbn;
    }

    public double getScore()
    {
        return score;
    }

    public void setScore(double score)
    {
        this.score = score;
    }

    public String getReview()
    {
        return review;
    }

    public void setReview(String review)
    {
        this.review = review;
    }
}
