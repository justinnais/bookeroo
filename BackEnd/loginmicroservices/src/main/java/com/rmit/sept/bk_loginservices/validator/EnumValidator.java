package com.rmit.sept.bk_loginservices.validator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.lang.annotation.Annotation;
import java.util.Arrays;

/**
 * Super class for mapping a relationship between an Annotation and ConstraintValidator
 * @param <T> - Annotation
 * @param <U> - ConstraintValidator
 */
public abstract class EnumValidator<T extends Annotation, U> implements ConstraintValidator<T, U>
{
    private U[] subset;
    private boolean nullable;

    protected void initialize(U[] subset, boolean nullable)
    {
        this.subset = subset;
        this.nullable = nullable;
    }

    @Override
    public boolean isValid(U value, ConstraintValidatorContext context)
    {
        if (value == null)
            return nullable;
        return Arrays.asList(subset).contains(value);
    }
}
