package com.rmit.sept.bk_loginservices.validator;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class AbnValidatorTest
{
    @Test
    @DisplayName("Pass when ABN validator returns true")
    public void ValidABN()
    {
        assertTrue(AbnValidator.validate("51824753556"));
    }

    @Test
    @DisplayName("Pass when ABN validator returns false")
    public void InvalidABN()
    {
        assertFalse(AbnValidator.validate("1234"));
    }
}