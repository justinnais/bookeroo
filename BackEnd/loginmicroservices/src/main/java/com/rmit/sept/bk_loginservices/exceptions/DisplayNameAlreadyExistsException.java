package com.rmit.sept.bk_loginservices.exceptions;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * This exception is called when a user is attempted to be created, but the chosen displayname is already used in the
 * system
 */
@ResponseStatus(HttpStatus.BAD_REQUEST)
public class DisplayNameAlreadyExistsException extends RuntimeException
{
    public DisplayNameAlreadyExistsException(String message)
    {
        super(message);
    }
}
