package com.rmit.sept.bk_loginservices.repositories;

import com.rmit.sept.bk_loginservices.model.User;
import com.rmit.sept.bk_loginservices.utils.AccountStatus;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends CrudRepository<User, Long>
{
    User findByUsername(String username);

    User findByDisplayName(String displayName);

    User getById(Long id);

    List<User> findByAccountStatus(AccountStatus status);
}
