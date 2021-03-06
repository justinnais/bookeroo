package com.rmit.sept.bk_loginservices.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.rmit.sept.bk_loginservices.utils.AccountStatus;
import com.rmit.sept.bk_loginservices.utils.AccountType;
import com.rmit.sept.bk_loginservices.validator.AccountStatusConstraint;
import com.rmit.sept.bk_loginservices.validator.AccountTypeConstraint;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.Collection;
import java.util.Date;

/**
 * Represents a User within the system, storing their relevant details
 */
@Entity
public class User implements UserDetails
{
    /**
     * The unique identifier for this user object
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * The unique display name of the user, which is shown to users on the website
     */
    @NotBlank(message = "Display Name is required")
    @Column(unique = true)
    private String displayName;

    /**
     * The email/username of the user, used to log them in to the system
     */
    @Email(message = "Username must be a valid email")
    @NotBlank(message = "Username is required")
    @Column(unique = true)
    private String username;

    /**
     * The first name of the user this object represents.
     * For a business account this is the contact name
     */
    @NotBlank(message = "First name is required")
    private String firstName;

    /**
     * The last name of the user this object represents.
     * For a business account this is a contact name
     */
    @NotBlank(message = "Last name is required")
    private String lastName;

    /**
     * The password of this account. Encrypted in the system,
     * not sent over JSON
     */
    @NotBlank(message = "Password field is required")
    private String password;

    /**
     * The date this account was created
     */
    private Date dateCreated;
    /**
     * The last date this account was updated
     */
    private Date lastUpdated;

    /**
     * Represents the current type of account (ADMIN, BUSINESS, NORMAL USER)
     */
    @AccountTypeConstraint(anyOf = {AccountType.ADMIN, AccountType.BUSINESS, AccountType.STANDARD})
    private AccountType accountType;

    /**
     * The current status of the account
     */
    @AccountStatusConstraint(nullable = true, anyOf = {AccountStatus.ACTIVE, AccountStatus.PENDING,
            AccountStatus.REJECTED, AccountStatus.BANNED, AccountStatus.INACTIVE})
    private AccountStatus accountStatus;

    /**
     * If a business account, the abn of the business
     */
    private String abn;

    /**
     * If a business account, the company name
     */
    private String companyName;

    //OneToMany with Project

    public User()
    {
    }

    public Long getId()
    {
        return this.id;
    }

    public void setId(Long id)
    {
        this.id = id;
    }

    public String getDisplayName()
    {
        return this.displayName;
    }

    public void setDisplayName(String displayName)
    {
        this.displayName = displayName;
    }

    public String getUsername()
    {
        return this.username;
    }

    public void setUsername(String username)
    {
        this.username = username;
    }

    public String getFullName()
    {
        return String.format("%s %s", this.firstName, this.lastName);
    }

    public String getFirstName()
    {
        return this.firstName;
    }

    public void setFirstName(String firstName)
    {
        this.firstName = firstName;
    }

    public String getLastName()
    {
        return this.lastName;
    }

    public void setLastName(String lastName)
    {
        this.lastName = lastName;
    }

    public String getPassword()
    {
        return this.password;
    }

    public void setPassword(String password)
    {
        this.password = password;
    }

    public Date getDateCreated()
    {
        return this.dateCreated;
    }

    public void setDateCreated(Date dateCreated)
    {
        this.dateCreated = dateCreated;
    }

    public Date getLastUpdated()
    {
        return this.lastUpdated;
    }

    public void setLastUpdated(Date lastUpdated)
    {
        this.lastUpdated = lastUpdated;
    }

    public AccountType getAccountType()
    {
        return this.accountType;
    }

    public void setAccountType(AccountType accountType)
    {
        this.accountType = accountType;
    }

    public AccountStatus getAccountStatus()
    {
        return this.accountStatus;
    }

    public void setAccountStatus(AccountStatus accountStatus)
    {
        this.accountStatus = accountStatus;
    }

    public String getAbn()
    {
        return this.abn;
    }

    public void setAbn(String abn)
    {
        this.abn = abn;
    }

    public String getCompanyName()
    {
        return this.companyName;
    }

    public void setCompanyName(String companyName)
    {
        this.companyName = companyName;
    }

    @PrePersist
    protected void onCreate()
    {
        this.dateCreated = new Date();
    }

    @PreUpdate
    protected void onUpdate()
    {
        this.lastUpdated = new Date();
    }

    /*
    UserDetails interface methods
     */

    @Override
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities()
    {
        return null;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonExpired()
    {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonLocked()
    {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isCredentialsNonExpired()
    {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isEnabled()
    {
        return true;
    }
}