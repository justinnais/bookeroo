package com.rmit.sept.bk_loginservices.exceptions;

/**
 * Response returned in the event of an {@link InvalidAbnException}
 */
public class InvalidAbnResponse
{
    String message;

    public InvalidAbnResponse(String abn)
    {
        this.message = abn;
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
