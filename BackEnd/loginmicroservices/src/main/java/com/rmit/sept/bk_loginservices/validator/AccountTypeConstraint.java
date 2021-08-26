package com.rmit.sept.bk_loginservices.validator;


import com.rmit.sept.bk_loginservices.utils.AccountType;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.*;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Target({METHOD, FIELD, ANNOTATION_TYPE, CONSTRUCTOR, PARAMETER, TYPE_USE})
@Retention(RUNTIME)
@Documented
@Constraint(validatedBy = AccountTypeConstraintValidator.class)
public @interface AccountTypeConstraint {

    AccountType[] anyOf();
    boolean nullable() default false;
    String message() default "Account type must be one of {anyOf}";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default  {};
}
