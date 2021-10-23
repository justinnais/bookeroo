package com.rmit.sept.bk_loginservices.exceptions;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Exception thrown if a user tries to register with an existing username
 */
@ResponseStatus(HttpStatus.BAD_REQUEST)
public class UsernameAlreadyExistsException extends RuntimeException
{
    public UsernameAlreadyExistsException(String message)
    {
        super(message);
    }
}
