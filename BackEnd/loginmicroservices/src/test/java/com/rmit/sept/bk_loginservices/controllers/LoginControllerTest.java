package com.rmit.sept.bk_loginservices.controllers;

import com.rmit.sept.bk_loginservices.utils.AccountType;
import org.json.JSONArray;
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

import java.sql.*;
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

    @AfterAll
    static void dbClose() throws SQLException
    {
        db.close();
    }

    @Test
    public void RegisterWithAllFieldsEmpty() throws Exception
    {
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.post("/api/user" +
                "/register").contentType(MediaType.APPLICATION_JSON);

        JSONObject userJson = new JSONObject();
        for (String s : Arrays.asList("firstName", "lastName", "password", "displayName",
                "accountType", "username"))
            userJson.put(s, "");

        MockHttpServletResponse response = getResponse(requestBuilder, userJson.toString(), true);
        Assertions.assertEquals(400, response.getStatus());
    }

    @Test
    public void RegisterWithValidUser() throws Exception
    {
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
                .post("/api/user/register").contentType(MediaType.APPLICATION_JSON);

        JSONObject userJson = new JSONObject();
        userJson.put("firstName", "firstName");
        userJson.put("lastName", "lastName");
        userJson.put("password", "password");
        userJson.put("displayName", "displayName");
        userJson.put("username", "username@registertest.com-test");
        userJson.put("accountType", AccountType.STANDARD);

        MockHttpServletResponse response = getResponse(requestBuilder, userJson.toString(), true);
        Assertions.assertEquals(201, response.getStatus());

        Assertions.assertTrue(deleteUser("username@registertest.com-test"));
    }

    @Test
    public void RegisterWithBusinessUser() throws Exception
    {
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
                .post("/api/user/register").contentType(MediaType.APPLICATION_JSON);

        JSONObject userJson = new JSONObject();
        userJson.put("firstName", "firstName");
        userJson.put("lastName", "lastName");
        userJson.put("password", "password");
        userJson.put("displayName", "displayName");
        userJson.put("username", "username@registertest.com-test");
        userJson.put("accountType", AccountType.BUSINESS);
        userJson.put("abn", "51824753556");
        userJson.put("companyName", "companyName");

        MockHttpServletResponse response = getResponse(requestBuilder, userJson.toString(), true);
        Assertions.assertEquals(201, response.getStatus());

        Assertions.assertTrue(deleteUser("username@registertest.com-test"));
    }

    @Test
    public void LoginWithAllFieldsEmpty() throws Exception
    {
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
                .post("/api/user/login").contentType(MediaType.APPLICATION_JSON);

        JSONObject userJson = new JSONObject();
        userJson.put("username", "");
        userJson.put("password", "");

        MockHttpServletResponse response = getResponse(requestBuilder, userJson.toString(), true);
        Assertions.assertEquals(400, response.getStatus());
    }

    @Test
    public void LoginWithNonEmptyFields() throws Exception
    {
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
                .post("/api/user/login").contentType(MediaType.APPLICATION_JSON);

        JSONObject userJson = new JSONObject();
        userJson.put("username", "asdf");
        userJson.put("password", "asdf");

        MockHttpServletResponse response = getResponse(requestBuilder, userJson.toString(), true);
        Assertions.assertEquals(401, response.getStatus());
    }

    @Test
    public void LoginWithValidUser() throws Exception
    {
        Assertions.assertTrue(createUser(AccountType.STANDARD));

        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
                .post("/api/user/login").contentType(MediaType.APPLICATION_JSON);

        JSONObject userJson = new JSONObject();
        userJson.put("username", "username@logintest.com-test");
        userJson.put("password", "password");

        MockHttpServletResponse response = getResponse(requestBuilder, userJson.toString(), true);
        Assertions.assertEquals(200, response.getStatus());

        Assertions.assertTrue(deleteUser("username@logintest.com-test"));
    }

    @Test
    public void GetUsersByAccountStatus() throws Exception
    {
        MockHttpServletRequestBuilder activeRequestBuilder = MockMvcRequestBuilders
                .get("/api/user/status/active").contentType(MediaType.APPLICATION_JSON);

        MockHttpServletResponse activeResponse = getResponse(activeRequestBuilder, true);
        Assertions.assertNotNull(activeResponse);
        Assertions.assertEquals(200, activeResponse.getStatus());
        JSONArray activeResponseJson = new JSONArray(activeResponse.getContentAsString());

        Assertions.assertEquals(countAccountsByStatus(0), activeResponseJson.length());

        MockHttpServletRequestBuilder pendingRequestBuilder = MockMvcRequestBuilders
                .get("/api/user/status/pending").contentType(MediaType.APPLICATION_JSON);

        MockHttpServletResponse pendingResponse = getResponse(pendingRequestBuilder, true);
        Assertions.assertEquals(200, pendingResponse.getStatus());
        JSONArray pendingResponseJson = new JSONArray(pendingResponse.getContentAsString());

        Assertions.assertEquals(countAccountsByStatus(3), pendingResponseJson.length());
    }

    private int countAccountsByStatus(int status) throws SQLException
    {
        PreparedStatement statement = db.prepareStatement(
                "SELECT COUNT(*) AS count FROM user WHERE account_status = ?");

        statement.setInt(1, status);
        ResultSet pendingResults = statement.executeQuery();
        Assertions.assertTrue(pendingResults.next());

        return pendingResults.getInt("count");
    }

    private MockHttpServletResponse getResponse(MockHttpServletRequestBuilder requestBuilder,
                                                boolean print) throws Exception
    {
        return getResponse(requestBuilder, "", print);
    }

    private MockHttpServletResponse getResponse(MockHttpServletRequestBuilder requestBuilder,
                                                String content, boolean print) throws Exception
    {
        ResultActions resultActions = mvc.perform(requestBuilder.content(content));
        if (print)
            resultActions.andDo(MockMvcResultHandlers.print());
        Assertions.assertNotNull(resultActions);
        return resultActions.andReturn().getResponse();
    }

    private boolean createUser(AccountType type) throws Exception
    {
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
                .post("/api/user/register").contentType(MediaType.APPLICATION_JSON);

        JSONObject userJson = new JSONObject();
        try
        {
            userJson.put("firstName", "firstName");
            userJson.put("lastName", "lastName");
            userJson.put("password", "password");
            userJson.put("displayName", "displayName");
            userJson.put("username", "username@logintest.com-test");
            userJson.put("accountType", type);
        } catch (JSONException e)
        {
            e.printStackTrace();
            return false;
        }

        MockHttpServletResponse response = getResponse(requestBuilder, userJson.toString(), false);
        return response.getStatus() == 201;
    }

    private static boolean deleteUser(String username)
    {
        try
        {
            db.prepareStatement("DELETE FROM user WHERE username LIKE '" + username + "'").execute();
        } catch (SQLException e)
        {
            e.printStackTrace();
            return false;
        }

        return true;
    }
}