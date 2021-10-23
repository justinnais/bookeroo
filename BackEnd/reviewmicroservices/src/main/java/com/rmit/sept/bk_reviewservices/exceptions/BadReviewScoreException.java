package com.rmit.sept.bk_reviewservices.exceptions;

/**
 * Exception for when the given review score is outside the specified bounds
 */
public class BadReviewScoreException extends Exception
{
    public BadReviewScoreException(String errorMessage)
    {
        super(errorMessage);
    }
}
