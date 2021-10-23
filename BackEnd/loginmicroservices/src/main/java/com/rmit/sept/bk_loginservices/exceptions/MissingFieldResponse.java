package com.rmit.sept.bk_loginservices.exceptions;

/**
 * Response returned in the event of a {@link MissingFieldException}
 */
public class MissingFieldResponse
{
    private String message;

    public MissingFieldResponse(String message)
    {
        this.message = message;
    }

    public String getMessage()
    {
        return this.message;
    }

    public void setMessage(String message)
    {
        this.message = message;
    }
}
