package com.rmit.sept.bk_loginservices.controllers;


import com.rmit.sept.bk_loginservices.model.User;
import com.rmit.sept.bk_loginservices.payload.JWTLoginSuccessResponse;
import com.rmit.sept.bk_loginservices.payload.LoginRequest;
import com.rmit.sept.bk_loginservices.repositories.UserRepository;
import com.rmit.sept.bk_loginservices.security.JwtTokenProvider;
import com.rmit.sept.bk_loginservices.services.MapValidationErrorService;
import com.rmit.sept.bk_loginservices.services.UserService;
import com.rmit.sept.bk_loginservices.utils.AccountStatus;
import com.rmit.sept.bk_loginservices.utils.AccountType;
import com.rmit.sept.bk_loginservices.validator.UserValidator;
import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

/**
 * This file contains all api calls related to user login and registration
 */
@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080","https://bookeroo.danieljmills.com"})
public class LoginController
{
    private static final Logger log = Logger.getLogger(LoginController.class);

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserValidator userValidator;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    /**
     * Returns a list of all {@link User}s in the system
     * @return - {@link ResponseEntity} containing a list of all users
     */
    @GetMapping("")
    public ResponseEntity<?> listUsers()
    {
        return new ResponseEntity<>(userRepository.findAll(), HttpStatus.OK);
    }

    /**
     * Returns a {@link User} with a specific given id. Throws a 404 if no user is found
     * @param id - id of the user to retrieve
     * @return - {@link ResponseEntity} containing the {@link User}
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getUser(@PathVariable Long id)
    {
        log.info("Get request for " + id);
        User user = userRepository.getById(id);
        if (user == null)
            return new ResponseEntity<>("No user exists with this id", HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    /**
     * Gets a list of users with a specific {@link AccountStatus}. Returns Bad Request of the status doesn't exist
     * @param statusString a string that matches one of {@link AccountStatus}'s values
     * @return  - {@link ResponseEntity} containing the list of {@link User}s
     */
    @GetMapping("/status/{status}")
    public ResponseEntity<?> getUserByStatus(@PathVariable("status") String statusString)
    {
        AccountStatus status;
        if (statusString.equalsIgnoreCase("ACTIVE"))
            status = AccountStatus.ACTIVE;
        else if (statusString.equalsIgnoreCase("INACTIVE"))
            status = AccountStatus.INACTIVE;
        else if (statusString.equalsIgnoreCase("DELETED"))
            status = AccountStatus.DELETED;
        else if (statusString.equalsIgnoreCase("PENDING"))
            status = AccountStatus.PENDING;
        else if (statusString.equalsIgnoreCase("BANNED"))
            status = AccountStatus.BANNED;
        else if (statusString.equalsIgnoreCase("REJECTED"))
            status = AccountStatus.REJECTED;
        else
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        return new ResponseEntity<>(userRepository.findByAccountStatus(status), HttpStatus.OK);
    }

    /**
     * Returns a {@link User} with a specific given displayName. Throws a 404 if no user is found
     * @param displayName - displayName of the user to retrieve
     * @return - {@link ResponseEntity} containing the {@link User}
     */
    @GetMapping("/profile/{displayName}")
    public ResponseEntity<?> getUserByDisplayName(@PathVariable String displayName)
    {
        log.info("Get request for " + displayName);
        User user = userRepository.findByDisplayName(displayName);
        if (user == null)
            return new ResponseEntity<>("No user exists with this display name",
                    HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    /**
     *Takes a {@link User} object in, and attempts to validate it using {@link LoginController#userValidator}.
     * If valid, registers it to the database
     * @param user - User to register
     * @param result - BindingResult object provided by spring boot
     * @return - a {@link ResponseEntity} with a {@link HttpStatus#CREATED} status code.
     */
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user, BindingResult result)
    {
        log.info("Receiving register request");

        if (user.getAccountType() == AccountType.BUSINESS)
            user.setAccountStatus(AccountStatus.PENDING);
        else
            user.setAccountStatus(AccountStatus.ACTIVE);

        // Validate passwords match
        userValidator.validate(user, result);
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null)
            return errorMap;

        log.info("New user is valid");

        User newUser = userService.saveUser(user);

        log.info("User: '" + newUser.getUsername() + "' created");

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    /**
     * Takes in a {@link LoginRequest} object, and uses it to log in with the stored details. On success, will return a
     * JWT token
     * @param loginRequest - Object containing login details
     * @param result - BindingResult object provided by spring boot
     * @return - A JWT token within a {@link ResponseEntity}
     */
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest,
                                              BindingResult result)
    {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null)
            return errorMap;

        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();

        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(username, password));

        User user = userRepository.findByUsername(username);
        AccountStatus status = user.getAccountStatus();
        if (status != AccountStatus.ACTIVE)
            return new ResponseEntity<>("Account status: " + status, HttpStatus.LOCKED);

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);
        log.info("Logged in user: " + username);

        return ResponseEntity.ok(new JWTLoginSuccessResponse(true, jwt));
    }

    /**
     * Updates the {@link User} object with the given id
     * @param id - ID of user to update
     * @param user - A {@link User} object storing the details to update
     * @return
     */
    @PatchMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User user)
    {
        User oldUser = userRepository.getById(id);
        if (oldUser == null)
            return new ResponseEntity<>("No user exists with this id", HttpStatus.NOT_FOUND);

        if (user.getDisplayName() != null)
            oldUser.setDisplayName(user.getDisplayName());
        if (user.getUsername() != null)
            oldUser.setUsername(user.getUsername());
        if (user.getFirstName() != null)
            oldUser.setFirstName(user.getFirstName());
        if (user.getLastName() != null)
            oldUser.setLastName(user.getLastName());
        if (user.getPassword() != null)
            oldUser.setPassword(user.getPassword());
        if (user.getAccountType() != null)
            oldUser.setAccountType(user.getAccountType());
        if (user.getAccountStatus() != null)
            oldUser.setAccountStatus(user.getAccountStatus());
        if (user.getAbn() != null)
            oldUser.setAbn(user.getAbn());
        if (user.getCompanyName() != null)
            oldUser.setCompanyName(user.getCompanyName());

        userRepository.save(oldUser);

        return ResponseEntity.ok(oldUser);
    }
}
