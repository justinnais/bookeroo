package com.rmit.sept.bk_loginservices.controllers;

import com.rmit.sept.bk_loginservices.utils.AccountType;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.Properties;

@SpringBootTest
@AutoConfigureMockMvc
class LoginControllerTest
{
    @Autowired
    private MockMvc mvc;

    private static Connection db;

    @BeforeAll
    static void dbConnect() throws SQLException
    {
        // Create database connection for cleaning test users
        Properties connectionProps = new Properties();
        connectionProps.put("user", "admin");
        connectionProps.put("password", "(rN9p:NdKHD:");
        db = DriverManager.getConnection("jdbc:mysql://bookeroo-db.cy3gnqvujqx0.ap-southeast-2" +
                ".rds.amazonaws.com:3306/bookeroo", connectionProps);

        // Ensure no previous test users exist
        db.prepareStatement("DELETE FROM user WHERE username LIKE '%-test'").execute();
    }

    @AfterAll
    static void cleanup() throws SQLException
    {
        // Ensures that any users created during tests get cleaned
        db.prepareStatement("DELETE FROM user WHERE username LIKE '%-test'").execute();
    }

    @Test
    public void RegisterWithAllFieldsEmpty() throws JSONException
    {
        JSONObject userJson = new JSONObject();
        for (String s : Arrays.asList("firstName", "lastName", "password", "displayName",
                "accountType", "username"))
            userJson.put(s, "");

        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.post("/api/users" +
                "/register").contentType(MediaType.APPLICATION_JSON);

        MockHttpServletResponse response = getResponse(requestBuilder, userJson.toString());
        Assertions.assertNotNull(response);
        Assertions.assertEquals(response.getStatus(), 400);
    }

    @Test
    public void RegisterWithValidUser() throws JSONException, SQLException
    {
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
                .post("/api/users/register").contentType(MediaType.APPLICATION_JSON);

        JSONObject userJson = new JSONObject();
        userJson.put("firstName", "firstName");
        userJson.put("lastName", "lastName");
        userJson.put("password", "password");
        userJson.put("displayName", "displayName");
        userJson.put("confirmPassword", "password");
        userJson.put("username", "username@username.com-test");
        userJson.put("accountType", AccountType.STANDARD);

        MockHttpServletResponse response = getResponse(requestBuilder, userJson.toString());
        Assertions.assertNotNull(response);
        Assertions.assertEquals(response.getStatus(), 201);

        db.prepareStatement("DELETE FROM user WHERE username = 'username@username.com-test'")
                .execute();
    }

    @Test
    public void LoginWithAllFieldsEmpty() throws JSONException
    {
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
                .post("/api/users/login").contentType(MediaType.APPLICATION_JSON);

        JSONObject userJson = new JSONObject();
        userJson.put("username", "");
        userJson.put("password", "");

        MockHttpServletResponse response = getResponse(requestBuilder, userJson.toString());
        Assertions.assertNotNull(response);
        Assertions.assertEquals(response.getStatus(), 400);
    }

    private MockHttpServletResponse getResponse(MockHttpServletRequestBuilder requestBuilder,
                                                String content)
    {
        try
        {
            return mvc.perform(requestBuilder.content(content))
                    .andDo(MockMvcResultHandlers.print())
                    .andReturn().getResponse();
        } catch (Exception e)
        {
            e.printStackTrace();
        }

        return null;
    }
}