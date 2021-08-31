package com.rmit.sept.bk_loginservices.controllers;

import com.rmit.sept.bk_loginservices.model.User;
import com.rmit.sept.bk_loginservices.utils.AccountType;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.MapBindingResult;
import org.springframework.validation.ObjectError;

import javax.validation.ConstraintViolationException;
import java.util.HashMap;
import java.util.List;

@SpringBootTest
class LoginControllerTest
{
    @Autowired
    private LoginController loginController;

    private MapBindingResult bindingResult;
    private User user;

    @BeforeEach
    private void setup()
    {
        bindingResult = new MapBindingResult(new HashMap<>(), "bindingResult");
        user = new User();
    }

    @Test
    @DisplayName("Test should pass when constraints are violated")
    public void CreateWithoutDetails()
    {
        // A valid password is required to pass the validator
        user.setPassword("qwerty");
        user.setConfirmPassword("qwerty");
        // Exceptions are thrown without an account type - this is a bug
        user.setAccountType(AccountType.STANDARD);

        Assertions.assertThrows(ConstraintViolationException.class, () -> loginController.registerUser(user, bindingResult));
    }
}