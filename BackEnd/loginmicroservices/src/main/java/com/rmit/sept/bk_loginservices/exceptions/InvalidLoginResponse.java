package com.rmit.sept.bk_loginservices.exceptions;

/**
 * Response returned when a user tries to log in with bad details
 */
public class InvalidLoginResponse
{
    private String username;
    private String password;
    private String error;

    public InvalidLoginResponse()
    {
        this.username = "Invalid Username(Email)";
        this.password = "Invalid Password";
    }

    public String getUsername()
    {
        return username;
    }

    public void setUsername(String username)
    {
        this.username = username;
    }

    public String getPassword()
    {
        return password;
    }

    public void setPassword(String password)
    {
        this.password = password;
    }

    public void setError(String error)
    {
        this.error = error;
    }

    public String getError()
    {
        return this.error;
    }
}


