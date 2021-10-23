package com.rmit.sept.bk_loginservices.repositories;

import com.rmit.sept.bk_loginservices.model.User;
import com.rmit.sept.bk_loginservices.utils.AccountStatus;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * CRUD repository for {@link User}. Adds a few methods for retrieving by specific fields
 */
@Repository
public interface UserRepository extends CrudRepository<User, Long>
{
    /**
     * Finds a {@link User} by their username
     * @param username - Username of the requested user
     * @return - User object or null
     */
    User findByUsername(String username);

    /**
     * Finds a {@link User} by their display name
     * @param displayName - Displayname of the requested user
     * @return - User object or null
     */
    User findByDisplayName(String displayName);

    /**
     * Finds a {@link User} by their id
     * @param id - Id of the user to return
     * @return - User object or null
     */
    User getById(Long id);

    /**
     * Finds a {@link List} of {@link User}s by their {@link AccountStatus}
     * @param status - Account status of the users to return
     * @return - List of Users
     */
    List<User> findByAccountStatus(AccountStatus status);
}
