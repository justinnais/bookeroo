package com.rmit.sept.bk_loginservices.validator;

import com.rmit.sept.bk_loginservices.utils.AccountType;

/**
 * Extension of {@link EnumValidator}, for {@link AccountTypeConstraint}
 */
public class AccountTypeConstraintValidator extends EnumValidator<AccountTypeConstraint,
        AccountType>
{
    @Override
    public void initialize(AccountTypeConstraint constraint)
    {
        super.initialize(constraint.anyOf(), constraint.nullable());
    }
}
