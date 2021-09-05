package com.rmit.sept.bk_loginservices.validator;

import com.rmit.sept.bk_loginservices.model.User;
import com.rmit.sept.bk_loginservices.utils.AccountType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.validation.BindingResult;
import org.springframework.validation.MapBindingResult;
import org.springframework.validation.ObjectError;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Objects;

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
    @DisplayName("Pass when password length error is not returned")
    public void PasswordMoreThan6Char()
    {
        user.setPassword("aaaaaa");

        assertFalse(containsError("Length.password"));
    }

    @Test
    @DisplayName("Pass when password length error is returned")
    public void PasswordLessThan6Char()
    {
        user.setPassword("aaaaa");

        assertTrue(containsError("Length.password"));
    }

    @Test
    @DisplayName("Pass when password mismatch error is not returned")
    public void PasswordsShouldMatch()
    {
        user.setPassword("qwerty");
        user.setConfirmPassword("qwerty");

        assertFalse(containsError("Match.confirmPassword"));
    }

    @Test
    @DisplayName("Pass when password mismatch error is returned")
    public void PasswordsShouldNotMatch()
    {
        user.setPassword("qwerty");
        user.setConfirmPassword("werty");

        assertTrue(containsError("Match.confirmPassword"));
    }

    @Test
    @DisplayName("Pass when missing abn error is returned")
    public void BusinessAccWithoutABN()
    {
        user.setAccountType(AccountType.BUSINESS);

        assertTrue(containsError("Missing.abn"));
    }

    @Test
    @DisplayName("Pass when missing abn error is not returned")
    public void BusinessAccWithABN()
    {
        user.setAccountType(AccountType.BUSINESS);
        user.setAbn("1234");

        assertFalse(containsError("Missing.abn"));
    }

    private boolean containsError(String errorCode)
    {
        validator.validate(user, bindingResult);
        List<ObjectError> errors = bindingResult.getAllErrors();

        return errors.stream().anyMatch(error ->
                Arrays.asList(Objects.requireNonNull(error.getCodes())).contains(errorCode));
    }
}