package com.rmit.sept.bk_loginservices.validator;

import com.rmit.sept.bk_loginservices.utils.AccountType;

public class AccountTypeConstraintValidator extends EnumValidator<AccountTypeConstraint, AccountType> {
    @Override
    public void initialize(AccountTypeConstraint constraint) {
        super.initialize(constraint.anyOf(), constraint.nullable());
    }
}
