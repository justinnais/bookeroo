package com.rmit.sept.bk_reviewservices.model;


import javax.persistence.*;

@Entity
public class BookReview
{
    public static double MAX_SCORE = 5.0;
    public static int MAX_LENGTH = 240;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;

    private Long userId;

    private String bookIsbn;

    private double score;

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
