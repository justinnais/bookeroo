package com.rmit.sept.bk_loginservices.validator;

import com.rmit.sept.bk_loginservices.utils.AccountStatus;

/**
 * Extension of {@link EnumValidator}, for {@link AccountStatusConstraint}
 */
public class AccountStatusConstraintValidator extends EnumValidator<AccountStatusConstraint,
        AccountStatus>
{
    @Override
    public void initialize(AccountStatusConstraint constraint)
    {
        super.initialize(constraint.anyOf(), constraint.nullable());
    }
}
