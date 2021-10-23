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

import java.io.UnsupportedEncodingException;
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
    }

    @AfterAll
    static void cleanup()
    {
        deleteTransaction("%555%");
    }

    @AfterAll
    static void dbClose() throws SQLException
    {
        db.close();
    }

    @Test
    public void CreateValidTransaction() throws JSONException
    {
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
                .post("/api/trans/create").contentType(MediaType.APPLICATION_JSON);

        JSONObject transJSON = new JSONObject();
        transJSON.put("buyerId", 25551);
        transJSON.put("price", 321);
        transJSON.put("listingId", 312);
        transJSON.put("captureId", "123");

        MockHttpServletResponse response = getResponse(requestBuilder, transJSON.toString());
        Assertions.assertNotNull(response);
        Assertions.assertEquals(200, response.getStatus());

        Assertions.assertTrue(deleteTransaction("25551"));
    }

    @Test
    public void CreateTransactionWithoutListingId() throws JSONException
    {
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
                .post("/api/trans/create").contentType(MediaType.APPLICATION_JSON);

        JSONObject transJSON = new JSONObject();
        transJSON.put("buyerId", 25551);
        transJSON.put("price", 123);

        MockHttpServletResponse response = getResponse(requestBuilder, transJSON.toString());
        Assertions.assertNotNull(response);
        Assertions.assertEquals(400, response.getStatus());
    }

    @Test
    public void CreateTransactionWithoutBuyerId() throws JSONException
    {
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
                .post("/api/trans/create").contentType(MediaType.APPLICATION_JSON);

        JSONObject transJSON = new JSONObject();
        transJSON.put("listingId", 6532);
        transJSON.put("price", 123);

        MockHttpServletResponse response = getResponse(requestBuilder, transJSON.toString());
        Assertions.assertNotNull(response);
        Assertions.assertEquals(400, response.getStatus());
    }

    @Test
    public void GetNonExistingListing() throws UnsupportedEncodingException, JSONException
    {
        String buyerId = "95559";
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
                .get("/api/trans/user/" + buyerId).contentType(MediaType.APPLICATION_JSON);

        MockHttpServletResponse response = getResponse(requestBuilder, "");
        Assertions.assertNotNull(response);

        JSONArray responseJSON = new JSONArray(response.getContentAsString());
        Assertions.assertEquals(0, responseJSON.length());
    }

    @Test
    public void GetExistingListing() throws JSONException, UnsupportedEncodingException
    {
        int buyerId = 85559;
        int listingId = 35558;
        createTransaction(buyerId, listingId);

        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
                .get("/api/trans/user/" + buyerId).contentType(MediaType.APPLICATION_JSON);

        MockHttpServletResponse response = getResponse(requestBuilder, "");
        Assertions.assertNotNull(response);

        JSONArray responseJSON = new JSONArray(response.getContentAsString());
        JSONObject object = (JSONObject) responseJSON.get(0);

        Assertions.assertEquals(listingId, object.get("listingId"));
        Assertions.assertEquals(123, object.get("price"));

        Assertions.assertTrue(deleteTransaction(String.valueOf(buyerId)));
    }

    private void createTransaction(long buyerId, long listingId) throws JSONException
    {
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
                .post("/api/trans/create").contentType(MediaType.APPLICATION_JSON);

        JSONObject transJSON = new JSONObject();
        transJSON.put("buyerId", buyerId);
        transJSON.put("listingId", listingId);
        transJSON.put("price", 123);
        transJSON.put("captureId", "123");

        MockHttpServletResponse response = getResponse(requestBuilder, transJSON.toString());
        Assertions.assertNotNull(response);
        Assertions.assertEquals(200, response.getStatus());
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
}