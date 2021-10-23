package com.rmit.sept.bk_transservices.transmicroservices.model;

/**
 * Status of the transaction
 */
public enum Status
{
    PENDING,
    ACCEPTED,
    IN_TRANSIT,
    DELIVERED,
    CANCELLED
}
