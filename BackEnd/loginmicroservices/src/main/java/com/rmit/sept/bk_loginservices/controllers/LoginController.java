package com.rmit.sept.bk_loginservices.controllers;


import com.rmit.sept.bk_loginservices.model.User;
import com.rmit.sept.bk_loginservices.payload.JWTLoginSuccessResponse;
import com.rmit.sept.bk_loginservices.payload.LoginRequest;
import com.rmit.sept.bk_loginservices.security.JwtTokenProvider;
import com.rmit.sept.bk_loginservices.services.MapValidationErrorService;
import com.rmit.sept.bk_loginservices.services.UserService;
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

import static com.rmit.sept.bk_loginservices.security.SecurityConstant.TOKEN_PREFIX;

/**
 * This file contains all api calls related to user login and registration
 */
@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080"})
// allows for CORS when testing locally
public class LoginController
{
    private static final Logger log = Logger.getLogger(LoginController.class);

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserValidator userValidator;

    // LIST
    @GetMapping("")
    public ResponseEntity<?> listUsers()
    {
        return new ResponseEntity<>(userService.listUsers(), HttpStatus.OK);
    }

    // GET BY ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getUser(@PathVariable Long id) {
        log.info("Get request for " + id);
        User user = userService.getUser(id);
        if (user == null) {
            return new ResponseEntity<>("No user exists with this id", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    // GET PROFILE
    @GetMapping("/profile/{displayName}")
    public ResponseEntity<?> getUserByDisplayName(@PathVariable String displayName) {
        log.info("Get request for " + displayName);
        User user = userService.getUserByDisplayName(displayName);
        if (user == null) {
            return new ResponseEntity<>("No user exists with this display name", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    // REGISTER
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user, BindingResult result)
    {
        log.info("Receiving register request");

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

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;

    // LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest,
                                              BindingResult result)
    {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;

        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        username,
                        password
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);
        log.info("Logged in user: " + username);
        return ResponseEntity.ok(new JWTLoginSuccessResponse(true, jwt));
    }
}
