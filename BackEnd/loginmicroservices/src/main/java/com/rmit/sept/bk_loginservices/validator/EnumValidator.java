package com.rmit.sept.bk_loginservices.validator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.lang.annotation.Annotation;
import java.util.Arrays;

public abstract class EnumValidator<T extends Annotation, U> implements ConstraintValidator<T, U> {
    private U[] subset;


    protected void initialize(U[] subset) {
        this.subset = subset;
    }

    @Override
    public boolean isValid(U value, ConstraintValidatorContext context) {
        if (value == null) {
            return true;
        }
        return Arrays.asList(subset).contains(value);
    }

}
