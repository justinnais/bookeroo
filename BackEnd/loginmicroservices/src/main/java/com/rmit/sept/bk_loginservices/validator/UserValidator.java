package com.rmit.sept.bk_loginservices.validator;

import com.rmit.sept.bk_loginservices.model.User;
import com.rmit.sept.bk_loginservices.utils.AccountType;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

/**
 * Validates {@link User} objects, for checking password length, and handles company specific validation
 * not possible within basic annotations
 */
@Component
public class UserValidator implements Validator
{
    @Override
    public boolean supports(Class<?> aClass)
    {
        return User.class.equals(aClass);
    }

    @Override
    public void validate(Object object, Errors errors)
    {
        User user = (User) object;


        if (user.getPassword() == null)
            errors.rejectValue("password", "Missing", "Password is required");
        else if (user.getPassword().length() < 6)
            errors.rejectValue("password", "Length",
                    "Password must be at least 6 characters");

        if (user.getAccountType() != null)
        {
            if (user.getAccountType() == AccountType.BUSINESS)
            {
                if (user.getAbn() == null)
                    errors.rejectValue("abn", "Missing",
                            "An ABN is required for company accounts");
                else if (!AbnValidator.validate(user.getAbn()))
                    errors.rejectValue("abn", "Invalid",
                            "The provided ABN is invalid");

                if (user.getCompanyName() == null)
                    errors.rejectValue("companyName", "Missing",
                            "A company name is required");
                else if (user.getCompanyName().isBlank())
                    errors.rejectValue("companyName", "Missing",
                            "A company name is required");
            }
        }
    }
}
