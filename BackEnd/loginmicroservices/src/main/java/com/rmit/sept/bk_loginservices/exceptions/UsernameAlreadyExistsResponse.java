package com.rmit.sept.bk_loginservices.exceptions;

/**
 * Response returned in the event of a {@link UsernameAlreadyExistsException}
 */
public class UsernameAlreadyExistsResponse
{
    private String username;

    public UsernameAlreadyExistsResponse(String username)
    {
        this.username = username;
    }

    public String getUsername()
    {
        return username;
    }

    public void setUsername(String username)
    {
        this.username = username;
    }
}