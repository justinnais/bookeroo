package com.rmit.sept.bk_bookservices.controllers;

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

import java.io.UnsupportedEncodingException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Properties;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureMockMvc
class BookControllerTest
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
    }

    @AfterAll
    static void dbClose() throws SQLException
    {
        db.close();
    }

    @Test
    public void GetAllBooks() throws SQLException, UnsupportedEncodingException, JSONException
    {
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
                .get("/api/book").contentType(MediaType.APPLICATION_JSON);

        ResultSet result = db.prepareStatement("SELECT COUNT(*) AS count FROM book")
                .executeQuery();
        Assertions.assertTrue(result.next());
        long count = result.getLong("count");

        MockHttpServletResponse response = getResponse(requestBuilder);
        Assertions.assertNotNull(response);
        JSONArray responseArray = new JSONArray(response.getContentAsString());
        Assertions.assertEquals(count, responseArray.length());
    }

    @Test
    public void GetBookByIsbn() throws UnsupportedEncodingException, JSONException
    {
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
                .get("/api/book/0316129089").contentType(MediaType.APPLICATION_JSON);

        MockHttpServletResponse response = getResponse(requestBuilder);
        Assertions.assertNotNull(response);

        JSONObject responseObject = new JSONObject(response.getContentAsString());
        Assertions.assertEquals("0316129089", responseObject.get("isbn"));
        Assertions.assertEquals("Paperback", responseObject.get("binding"));
        Assertions.assertEquals("First Edition", responseObject.get("edition"));
        Assertions.assertEquals("en_US", responseObject.get("language"));
        Assertions.assertEquals("Leviathan Wakes", responseObject.get("title"));
    }

    private MockHttpServletResponse getResponse(MockHttpServletRequestBuilder requestBuilder)
    {
        return getResponse(requestBuilder, "");
    }

    private MockHttpServletResponse getResponse(MockHttpServletRequestBuilder requestBuilder,
                                                String content)
    {
        try
        {
            ResultActions resultActions = mvc.perform(requestBuilder.content(content));
            resultActions.andDo(MockMvcResultHandlers.print());
            return resultActions.andReturn().getResponse();
        } catch (Exception e)
        {
            e.printStackTrace();
        }
        return null;
    }
}