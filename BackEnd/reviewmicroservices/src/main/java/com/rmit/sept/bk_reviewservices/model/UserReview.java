package com.rmit.sept.bk_reviewservices.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class UserReview
{
    private static final double MAX_SCORE = 5.0;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;
    private Long reviewerUserId;
    private Long reviewedUserId;
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
