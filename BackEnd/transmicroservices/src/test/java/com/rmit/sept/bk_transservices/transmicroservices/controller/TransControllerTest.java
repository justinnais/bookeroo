package com.rmit.sept.bk_transservices.transmicroservices.controller;

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

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

@SpringBootTest
@AutoConfigureMockMvc
class TransControllerTest
{
    @Autowired
    MockMvc mvc;

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

        deleteTransaction("%555%");
        deleteTransItem("%555%");
    }

    @AfterAll
    static void cleanup()
    {
        deleteTransaction("%555%");
        deleteTransItem("%555%");
    }

    @Test
    public void CreateValidTransaction() throws JSONException
    {
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.post("/api/trans" +
                "/transaction").contentType(MediaType.APPLICATION_JSON);

        JSONArray listings = new JSONArray();
        listings.put(createListing(123, 15551));
        listings.put(createListing(543, 15552));

        JSONObject transJSON = new JSONObject();
        transJSON.put("buyer_id", 25551);
        transJSON.put("listings", listings);

        MockHttpServletResponse response = getResponse(requestBuilder, transJSON.toString(), true);
        Assertions.assertNotNull(response);
        Assertions.assertEquals(200, response.getStatus());

        Assertions.assertTrue(deleteTransItem("%555%"));
        Assertions.assertTrue(deleteTransaction("%555%"));
    }

    @Test
    public void CreateTransactionWithoutListing() throws JSONException
    {
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.post("/api/trans" +
                "/transaction").contentType(MediaType.APPLICATION_JSON);

        JSONObject transJSON = new JSONObject();
        transJSON.put("buyer_id", 25551);

        MockHttpServletResponse response = getResponse(requestBuilder, transJSON.toString(), true);
        Assertions.assertNotNull(response);
        Assertions.assertEquals(400, response.getStatus());
    }

    @Test
    public void CreateTransactionWithoutBuyer() throws JSONException
    {
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.post("/api/trans" +
                "/transaction").contentType(MediaType.APPLICATION_JSON);

        JSONArray listings = new JSONArray();
        listings.put(createListing(123, 15551));
        listings.put(createListing(543, 15552));

        JSONObject transJSON = new JSONObject();
        transJSON.put("listings", listings);

        MockHttpServletResponse response = getResponse(requestBuilder, transJSON.toString(), true);
        Assertions.assertNotNull(response);
        Assertions.assertEquals(400, response.getStatus());
    }

    private JSONObject createListing(long price, long listing_id) throws JSONException
    {
        JSONObject listing = new JSONObject();
        listing.put("price", price);
        listing.put("listing_id", listing_id);
        return listing;
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

    private static boolean deleteTransaction(String buyerId)
    {
        try
        {
            db.prepareStatement("DELETE FROM transaction WHERE buyer_id LIKE '" + buyerId + "'").execute();
        } catch (SQLException e)
        {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    private static boolean deleteTransItem(String listingId)
    {
        try
        {
            db.prepareStatement("DELETE FROM transaction_item WHERE listing_id LIKE '" + listingId +
                    "'").execute();
        } catch (SQLException e)
        {
            e.printStackTrace();
            return false;
        }
        return true;
    }
}