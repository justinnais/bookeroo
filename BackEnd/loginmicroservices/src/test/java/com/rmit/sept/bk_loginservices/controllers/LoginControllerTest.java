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

    private JSONObject userJson;
    private MockHttpServletRequestBuilder requestBuilder;
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

    @BeforeEach
    void setup() throws JSONException
    {
        userJson = new JSONObject();
        for (String s : Arrays.asList("firstName", "lastName", "password", "displayName",
                "accountType", "username"))
            userJson.put(s, "");

        requestBuilder = MockMvcRequestBuilders.post("/api/users/register")
                .contentType(MediaType.APPLICATION_JSON);
    }

    @Test
    @DisplayName("Pass when status 400 is returned")
    public void AllFieldsEmpty()
    {
        MockHttpServletResponse response = getResponse(userJson);
        Assertions.assertNotNull(response);
        Assertions.assertEquals(response.getStatus(), 400);
    }

    @Test
    @DisplayName("Pass when status 201 is returned")
    public void ValidUser() throws JSONException, SQLException
    {
        userJson.put("firstName", "firstName");
        userJson.put("lastName", "lastName");
        userJson.put("password", "password");
        userJson.put("displayName", "displayName");
        userJson.put("confirmPassword", "password");
        userJson.put("username", "username@username.com-test");
        userJson.put("accountType", AccountType.STANDARD);

        MockHttpServletResponse response = getResponse(userJson);
        Assertions.assertNotNull(response);
        Assertions.assertEquals(response.getStatus(), 201);

        db.prepareStatement("DELETE FROM user WHERE username = 'username@username.com-test'")
                .execute();
    }

    private MockHttpServletResponse getResponse(JSONObject userJson)
    {
        try
        {
            return mvc.perform(requestBuilder.content(userJson.toString()))
                    .andDo(MockMvcResultHandlers.print())
                    .andReturn().getResponse();
        } catch (Exception e)
        {
            e.printStackTrace();
        }

        return null;
    }
}