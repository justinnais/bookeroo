package com.rmit.sept.bk_loginservices.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

/**
 * Maps custom Java exceptions to {@link ResponseEntity}s, so that in the event of a java exception,
 * springboot can return an exception for the frontend, rather than just a 500
 */
@ControllerAdvice
@RestController
public class CustomResponseEntityExceptionHandler extends ResponseEntityExceptionHandler
{
    @ExceptionHandler
    public final ResponseEntity<Object> handleUsernameAlreadyExists(UsernameAlreadyExistsException ex,
                                                                    WebRequest request)
    {
        UsernameAlreadyExistsResponse exceptionResponse =
                new UsernameAlreadyExistsResponse(ex.getMessage());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleDisplayNameAlreadyExists(DisplayNameAlreadyExistsException ex,
                                                                       WebRequest request)
    {
        DisplayNameAlreadyExistsResponse existsResponse =
                new DisplayNameAlreadyExistsResponse(ex.getMessage());
        return new ResponseEntity<>(existsResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleInvalidAbn(InvalidAbnException ex, WebRequest request)
    {
        InvalidAbnResponse invalidResponse = new InvalidAbnResponse(ex.getMessage());
        return new ResponseEntity<>(invalidResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleMissingField(MissingFieldException ex,
                                                           WebRequest request)
    {
        MissingFieldResponse missingResponse = new MissingFieldResponse(ex.getMessage());
        return new ResponseEntity<>(missingResponse, HttpStatus.BAD_REQUEST);
    }

}

