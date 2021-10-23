package com.rmit.sept.bk_loginservices.utils;

/**
 * Stores the types of {@link com.rmit.sept.bk_loginservices.model.User} within the system
 */
public enum AccountType
{
    /**
     * Standard account
     */
    STANDARD,
    /**
     * An account owned by a shop owner or business
     */
    BUSINESS,
    /**
     * An account owned by a site administrator
     */
    ADMIN
}
