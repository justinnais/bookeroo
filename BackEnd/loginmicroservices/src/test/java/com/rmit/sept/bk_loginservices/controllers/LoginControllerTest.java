package com.rmit.sept.bk_loginservices.controllers;

import com.rmit.sept.bk_loginservices.utils.AccountType;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
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
        deleteUser("%-test");
    }

    @AfterAll
    static void cleanup()
    {
        // Ensures that any users created during tests get cleaned
        deleteUser("%-test");
    }

    @Test
    public void RegisterWithAllFieldsEmpty() throws JSONException
    {
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.post("/api/users" +
                "/register").contentType(MediaType.APPLICATION_JSON);

        JSONObject userJson = new JSONObject();
        for (String s : Arrays.asList("firstName", "lastName", "password", "displayName",
                "accountType", "username"))
            userJson.put(s, "");

        MockHttpServletResponse response = getResponse(requestBuilder, userJson.toString(), true);
        Assertions.assertNotNull(response);
        Assertions.assertEquals(400, response.getStatus());
    }

    @Test
    public void RegisterWithValidUser() throws JSONException
    {
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
                .post("/api/users/register").contentType(MediaType.APPLICATION_JSON);

        JSONObject userJson = new JSONObject();
        userJson.put("firstName", "firstName");
        userJson.put("lastName", "lastName");
        userJson.put("password", "password");
        userJson.put("displayName", "displayName");
        userJson.put("username", "username@registertest.com-test");
        userJson.put("accountType", AccountType.STANDARD);

        MockHttpServletResponse response = getResponse(requestBuilder, userJson.toString(), true);
        Assertions.assertNotNull(response);
        Assertions.assertEquals(201, response.getStatus());

        Assertions.assertTrue(deleteUser("username@registertest.com-test"));
    }

    @Test
    public void LoginWithAllFieldsEmpty() throws JSONException
    {
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
                .post("/api/users/login").contentType(MediaType.APPLICATION_JSON);

        JSONObject userJson = new JSONObject();
        userJson.put("username", "");
        userJson.put("password", "");

        MockHttpServletResponse response = getResponse(requestBuilder, userJson.toString(), true);
        Assertions.assertNotNull(response);
        Assertions.assertEquals(400, response.getStatus());
    }

    @Test
    public void LoginWithNonEmptyFields() throws JSONException
    {
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
                .post("/api/users/login").contentType(MediaType.APPLICATION_JSON);

        JSONObject userJson = new JSONObject();
        userJson.put("username", "asdf");
        userJson.put("password", "asdf");

        MockHttpServletResponse response = getResponse(requestBuilder, userJson.toString(), true);
        Assertions.assertNotNull(response);
        Assertions.assertEquals(401, response.getStatus());
    }

    @Test
    public void LoginWithValidUser() throws JSONException
    {
        Assertions.assertTrue(createUser("username@logintest.com-test"));

        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
                .post("/api/users/login").contentType(MediaType.APPLICATION_JSON);

        JSONObject userJson = new JSONObject();
        userJson.put("username", "username@logintest.com-test");
        userJson.put("password", "password");

        MockHttpServletResponse response = getResponse(requestBuilder, userJson.toString(), true);
        Assertions.assertNotNull(response);
        Assertions.assertEquals(200, response.getStatus());

        Assertions.assertTrue(deleteUser("username@logintest.com-test"));
    }

    private MockHttpServletResponse getResponse(MockHttpServletRequestBuilder requestBuilder,
                                                String content, boolean print)
    {
        try
        {
            ResultActions resultActions = mvc.perform(requestBuilder.content(content));
            if (print)
                resultActions.andDo(MockMvcResultHandlers.print());
            return resultActions.andReturn().getResponse();
        } catch (Exception e)
        {
            e.printStackTrace();
        }

        return null;
    }

    private boolean createUser(String username)
    {
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
                .post("/api/users/register").contentType(MediaType.APPLICATION_JSON);

        JSONObject userJson = new JSONObject();
        try
        {
            userJson.put("firstName", "firstName");
            userJson.put("lastName", "lastName");
            userJson.put("password", "password");
            userJson.put("displayName", "displayName");
            userJson.put("username", username);
            userJson.put("accountType", AccountType.STANDARD);
        } catch (JSONException e)
        {
            e.printStackTrace();
            return false;
        }

        MockHttpServletResponse response = getResponse(requestBuilder, userJson.toString(), false);
        return response != null && response.getStatus() == 201;
    }

    private static boolean deleteUser(String username)
    {
        try
        {
            db.prepareStatement("DELETE FROM user WHERE username = '" + username + "'").execute();
        } catch (SQLException e)
        {
            e.printStackTrace();
            return false;
        }

        return true;
    }
}