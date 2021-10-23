package com.rmit.sept.bk_reviewservices.exceptions;

/**
 * Exception for when a user has already reviewed a given book
 */
public class DuplicateReviewException extends Exception
{
    public DuplicateReviewException(String errorMessage)
    {
        super(errorMessage);
    }
}
