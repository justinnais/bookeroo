package com.rmit.sept.bk_loginservices.web;

import com.rmit.sept.bk_loginservices.controllers.LoginController;
import com.rmit.sept.bk_loginservices.security.JwtAuthenticationEntryPoint;
import com.rmit.sept.bk_loginservices.security.JwtTokenProvider;
import com.rmit.sept.bk_loginservices.services.CustomUserDetailsService;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

@RunWith(SpringRunner.class)
@WebMvcTest(LoginController.class)
@AutoConfigureMockMvc(addFilters = false)
class LoginControllerTest
{
    @Autowired
    private MockMvc mvc;

    @MockBean
    CustomUserDetailsService customUserDetailsService;
    @MockBean
    JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    @MockBean
    LoginController loginController;
    @MockBean
    JwtTokenProvider jwtTokenProvider;

    @Test
    public void CreateWithoutDetails()
    {
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.post("/api/users" +
                "/register").content("").contentType("application/json");
        try
        {
            MvcResult result = mvc.perform(requestBuilder).andReturn();
            System.out.println(result);
        } catch (Exception e)
        {
            e.printStackTrace();
        }
    }
}