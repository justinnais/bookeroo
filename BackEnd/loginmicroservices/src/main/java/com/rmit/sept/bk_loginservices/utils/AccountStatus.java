package com.rmit.sept.bk_loginservices.utils;

import com.rmit.sept.bk_loginservices.model.User;

/**
 * Stores a list of states a {@link User} can be in
 */
public enum AccountStatus
{
    /**
     * The account is active as normal
     */
    ACTIVE,
    /**
     * The account has not been used in some time
     */
    INACTIVE,
    /**
     * The account has been deleted
     */
    DELETED,
    /**
     * The account is pending review by an admin
     */
    PENDING,
    /**
     * The account was banned by an admin
     */
    BANNED,
    /**
     * The pending account was rejected by the admin
     */
    REJECTED
}
