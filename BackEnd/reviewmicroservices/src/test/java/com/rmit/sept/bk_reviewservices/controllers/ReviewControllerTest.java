package com.rmit.sept.bk_reviewservices.controllers;

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
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Properties;

@SpringBootTest
@AutoConfigureMockMvc
class ReviewControllerTest
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

        deleteTestReviews();
    }

    @AfterAll
    static void cleanup()
    {
        deleteTestReviews();
    }

    @AfterAll
    static void dbClose() throws SQLException
    {
        db.close();
    }

    @Test
    public void CreateValidReview() throws Exception
    {
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
                .post("/api/review/post").contentType(MediaType.APPLICATION_JSON);

        JSONObject review = new JSONObject();
        review.put("bookIsbn", "321123");
        review.put("review", "This is a test review");
        review.put("score", 4.0);
        review.put("userId", 1);

        MockHttpServletResponse response = getResponse(requestBuilder, review.toString());
        Assertions.assertNotNull(response);
        Assertions.assertEquals(201, response.getStatus());

        JSONObject jsonResponse = new JSONObject(response.getContentAsString());
        for (String field : new String[]{"bookIsbn", "review", "score", "userId"})
            Assertions.assertEquals(review.get(field), jsonResponse.get(field));

        Assertions.assertTrue(deleteTestReviews());
    }

    @Test
    public void CreateDuplicateReview() throws Exception
    {
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
                .post("/api/review/post").contentType(MediaType.APPLICATION_JSON);

        JSONObject review = new JSONObject();
        review.put("bookIsbn", "321123");
        review.put("review", "This is a test review");
        review.put("score", 4.0);
        review.put("userId", 1);

        MockHttpServletResponse response = getResponse(requestBuilder, review.toString());
        Assertions.assertNotNull(response);
        Assertions.assertEquals(201, response.getStatus());

        response = getResponse(requestBuilder, review.toString());
        Assertions.assertNotNull(response);
        Assertions.assertEquals(409, response.getStatus());

        Assertions.assertTrue(deleteTestReviews());
    }

    @Test
    public void CreateReviewWithoutIsbn() throws Exception
    {
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
                .post("/api/review/post").contentType(MediaType.APPLICATION_JSON);

        JSONObject review = new JSONObject();
        review.put("review", "This is a test review");
        review.put("score", 4.0);
        review.put("userId", 1);

        MockHttpServletResponse response = getResponse(requestBuilder, review.toString());
        Assertions.assertNotNull(response);
        Assertions.assertEquals(400, response.getStatus());
    }

    private static boolean deleteTestReviews()
    {
        try
        {
            PreparedStatement statement =
                    db.prepareStatement("DELETE FROM review WHERE book_isbn = '321123'");
            statement.execute();
            return true;
        } catch (SQLException e)
        {
            e.printStackTrace();
        }

        return false;
    }

    private MockHttpServletResponse getResponse(MockHttpServletRequestBuilder requestBuilder) throws Exception
    {
        return getResponse(requestBuilder, "");
    }

    private MockHttpServletResponse getResponse(MockHttpServletRequestBuilder requestBuilder,
                                                String content) throws Exception
    {
        ResultActions resultActions = mvc.perform(requestBuilder.content(content));
        resultActions.andDo(MockMvcResultHandlers.print());
        Assertions.assertNotNull(resultActions);
        return resultActions.andReturn().getResponse();
    }
}