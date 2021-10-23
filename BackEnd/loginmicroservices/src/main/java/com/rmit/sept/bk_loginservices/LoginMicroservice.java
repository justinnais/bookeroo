package com.rmit.sept.bk_loginservices;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 * Runs the microservice
 */
@SpringBootApplication()
public class LoginMicroservice
{
    @Bean
    BCryptPasswordEncoder bCryptPasswordEncoder()
    {
        return new BCryptPasswordEncoder();
    }

    public static void main(String[] args)
    {
        SpringApplication.run(LoginMicroservice.class, args);
    }
}
