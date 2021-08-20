package com.rmit.sept.bk_loginservices.exceptions;

public class MissingFieldResponse {

    private String message;

    public MissingFieldResponse(String message) {
        this.message = message;
    }

    public String getMessage(){return this.message;}

    public void setMessage(String message) {this.message = message;}

}
