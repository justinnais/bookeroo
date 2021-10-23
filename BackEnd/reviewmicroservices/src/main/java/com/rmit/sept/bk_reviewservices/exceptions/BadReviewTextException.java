package com.rmit.sept.bk_reviewservices.exceptions;

/**
 * Exception for when the given review text is too long
 */
public class BadReviewTextException extends Exception
{
    public BadReviewTextException(String errorMessage)
    {
        super(errorMessage);
    }
}
