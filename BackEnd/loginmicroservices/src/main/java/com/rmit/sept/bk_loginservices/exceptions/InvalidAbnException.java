package com.rmit.sept.bk_loginservices.exceptions;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Exception thrown in the event an invalid ABN is attempted to be used to register a user
 */
@ResponseStatus(HttpStatus.BAD_REQUEST)
public class InvalidAbnException extends RuntimeException
{
    public InvalidAbnException(String message)
    {
        super(message);
    }
}
