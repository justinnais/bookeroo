package com.rmit.sept.bk_loginservices.exceptions;

public class DisplayNameAlreadyExistsResponse
{
    private String displayName;

    public DisplayNameAlreadyExistsResponse(String displayName)
    {
        this.displayName = displayName;
    }

    public String getDisplayName()
    {
        return displayName;
    }

    public void setUsername(String displayName)
    {
        this.displayName = displayName;
    }
}
