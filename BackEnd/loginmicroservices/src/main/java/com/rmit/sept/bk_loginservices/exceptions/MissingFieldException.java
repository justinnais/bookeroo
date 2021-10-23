package com.rmit.sept.bk_loginservices.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Exception thrown if there is a missing field in a request such as login or register
 */
@ResponseStatus(HttpStatus.BAD_REQUEST)
public class MissingFieldException extends RuntimeException
{
    public MissingFieldException(String message)
    {
        super(message);
    }
}
