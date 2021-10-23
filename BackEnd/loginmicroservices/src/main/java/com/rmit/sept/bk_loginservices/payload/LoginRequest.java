package com.rmit.sept.bk_loginservices.payload;

import javax.validation.constraints.NotBlank;

/**
 * A payload that stores a username and password sent to the backend when a user tries to log in.
 */
public class LoginRequest
{
    @NotBlank(message = "Username cannot be blank")
    private String username;
    @NotBlank(message = "Password cannot be blank")
    private String password;

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
}