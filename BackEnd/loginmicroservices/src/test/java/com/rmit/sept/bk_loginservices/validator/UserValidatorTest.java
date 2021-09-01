package com.rmit.sept.bk_loginservices.validator;

import com.rmit.sept.bk_loginservices.model.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.validation.BindingResult;
import org.springframework.validation.MapBindingResult;
import org.springframework.validation.ObjectError;

import java.util.HashMap;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class UserValidatorTest
{
    private BindingResult bindingResult;
    private UserValidator validator;
    private User user;

    @BeforeEach
    void setup()
    {
        bindingResult = new MapBindingResult(new HashMap<>(), "bindingResult");
        validator = new UserValidator();
        user = new User();
    }

    @Test
    @DisplayName("Test should pass when password has more than 6 characters")
    public void PasswordMoreThan6Char()
    {
        user.setPassword("aaaaaa");
        validator.validate(user, bindingResult);

        assertFalse(containsError(bindingResult, "Length"));
    }

    @Test
    @DisplayName("Test should pass when password has less than 6 characters")
    public void PasswordLessThan6Char()
    {
        user.setPassword("aaaaa");
        validator.validate(user, bindingResult);

        assertTrue(containsError(bindingResult, "Length"));
    }

    @Test
    @DisplayName("Test should pass when passwords match")
    public void PasswordsShouldMatch()
    {
        user.setPassword("qwerty");
        user.setConfirmPassword("qwerty");
        validator.validate(user, bindingResult);

        assertFalse(containsError(bindingResult, "Match"));
    }

    @Test
    @DisplayName("Test should pass when passwords don't match")
    public void PasswordsShouldNotMatch()
    {
        user.setPassword("qwerty");
        user.setConfirmPassword("werty");
        validator.validate(user, bindingResult);

        assertTrue(containsError(bindingResult, "Match"));
    }

    private boolean containsError(BindingResult bindingResult, String errorCode)
    {
        List<ObjectError> errors = bindingResult.getAllErrors();
        return errors.stream().anyMatch(error -> error.getCode().equals(errorCode));
    }
}