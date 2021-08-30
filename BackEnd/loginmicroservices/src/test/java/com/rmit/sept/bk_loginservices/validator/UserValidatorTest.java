package com.rmit.sept.bk_loginservices.validator;

import com.rmit.sept.bk_loginservices.model.User;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.validation.MapBindingResult;
import org.springframework.validation.ObjectError;

import java.util.HashMap;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class UserValidatorTest
{

    @Test
    @DisplayName("Test should pass when password has more than 6 characters")
    void PasswordShouldBeMoreThan6Char()
    {
        User user = new User();
        user.setPassword("aaaaaa");
        user.setConfirmPassword("aaaaaa");

        UserValidator validator = new UserValidator();
        MapBindingResult bindingResult = new MapBindingResult(new HashMap<>(), "bindingResult");

        validator.validate(user, bindingResult);

        List<ObjectError> errorList = bindingResult.getAllErrors();
        assertFalse(containsError(errorList, "Length"));
    }

    @Test
    @DisplayName("Test should pass when password has less than 6 characters")
    void PasswordShouldBeLessThan6Char()
    {
        User user = new User();
        user.setPassword("aaaaa");
        user.setConfirmPassword("aaaaa");

        UserValidator validator = new UserValidator();
        MapBindingResult bindingResult = new MapBindingResult(new HashMap<>(), "bindingResult");

        validator.validate(user, bindingResult);

        List<ObjectError> errorList = bindingResult.getAllErrors();
        assertTrue(containsError(errorList, "Length"));
    }

    private boolean containsError(List<ObjectError> errors, String errorCode)
    {
        for (ObjectError error : errors)
        {
            if (error.getCode().equals(errorCode))
                return true;
        }
        return false;
    }
}