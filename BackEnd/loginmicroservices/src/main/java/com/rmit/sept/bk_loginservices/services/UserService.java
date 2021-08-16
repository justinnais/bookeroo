package com.rmit.sept.bk_loginservices.services;




import com.rmit.sept.bk_loginservices.exceptions.UsernameAlreadyExistsException;
import com.rmit.sept.bk_loginservices.repositories.UserRepository;
import com.rmit.sept.bk_loginservices.exceptions.DisplayNameAlreadyExistsException;
import com.rmit.sept.bk_loginservices.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public User saveUser (User newUser){

        //Encrypt the password
        newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));

        //If the username is already in use, throw exception
        if (userRepository.findByUsername(newUser.getUsername()) != null) {
            throw new UsernameAlreadyExistsException("Username '"+newUser.getUsername()+"' already exists");
        }

        //If the display name already exists, throw exception
        if (userRepository.findByDisplayName(newUser.getDisplayName()) != null) {
            throw new DisplayNameAlreadyExistsException("Display Name '"+newUser.getDisplayName()+"' already exists");
        }

        //Clear the "confirm password" then save and return the user
        newUser.setConfirmPassword("");
        return userRepository.save(newUser);

    }


}
