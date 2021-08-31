package com.rmit.sept.bk_loginservices.validator;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class AbnValidatorTest
{
    @Test
    @DisplayName("Test should pass with a valid ABN")
    public void ValidABN()
    {
        assertTrue(AbnValidator.validate("51824753556"));
    }

    @Test
    @DisplayName("Test should pass with an invalid ABN")
    public void InvalidABN()
    {
        assertFalse(AbnValidator.validate("1234"));
    }
}