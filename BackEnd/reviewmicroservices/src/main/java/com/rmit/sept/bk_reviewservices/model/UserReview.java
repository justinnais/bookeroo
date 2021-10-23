package com.rmit.sept.bk_reviewservices.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * Representation of the UserReview entity in the system
 */
@Entity
public class UserReview
{
    /**
     * Unique identifier for the UserReview object
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;
    /**
     * Id of the user who created the review
     */
    private Long reviewerUserId;
    /**
     * Id of the user for who the review relates
     */
    private Long reviewedUserId;
    /**
     * Numerical score given as part of the review
     */
    private Double score;

    public UserReview()
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

    public Long getReviewerUserId()
    {
        return reviewerUserId;
    }

    public void setReviewerUserId(Long reviewerUserId)
    {
        this.reviewerUserId = reviewerUserId;
    }

    public Long getReviewedUserId()
    {
        return reviewedUserId;
    }

    public void setReviewedUserId(Long reviewedUserId)
    {
        this.reviewedUserId = reviewedUserId;
    }

    public Double getScore()
    {
        return score;
    }

    public void setScore(Double score)
    {
        this.score = score;
    }
}
