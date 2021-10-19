package com.rmit.sept.bk_listingservice.listingmicroservice.controller;

import com.rmit.sept.bk_listingservice.listingmicroservice.model.Condition;
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
import java.sql.*;
import java.util.Properties;

@SpringBootTest
@AutoConfigureMockMvc
class ListingControllerTest
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
    static void cleanup() throws SQLException
    {
        db.prepareStatement("DELETE FROM listing WHERE book_isbn LIKE '%555%'").execute();
    }

    @AfterAll
    static void dbClose() throws SQLException
    {
        db.close();
    }

    @Test
    public void CreateValidListing() throws JSONException
    {
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
                .post("/api/listing/create").contentType(MediaType.APPLICATION_JSON);

        JSONObject listingJSON = new JSONObject();
        listingJSON.put("userId", 35550);
        listingJSON.put("bookIsbn", "1555");
        listingJSON.put("used", false);
        listingJSON.put("condition", Condition.NEW);
        listingJSON.put("conditionDesc", "N/A");
        listingJSON.put("price", 123);

        MockHttpServletResponse response = getResponse(requestBuilder, listingJSON.toString());
        Assertions.assertNotNull(response);
        Assertions.assertEquals(200, response.getStatus());
    }

    @Test
    public void CreateListingMissingId() throws JSONException
    {
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
                .post("/api/listing/create").contentType(MediaType.APPLICATION_JSON);

        JSONObject listingJSON = new JSONObject();
        listingJSON.put("used", false);
        listingJSON.put("condition", Condition.NEW);
        listingJSON.put("conditionDesc", "N/A");
        listingJSON.put("price", 123);

        MockHttpServletResponse response = getResponse(requestBuilder, listingJSON.toString());
        Assertions.assertNotNull(response);
        Assertions.assertEquals(400, response.getStatus());
    }

    @Test
    public void CreateEmptyListing()
    {
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
                .post("/api/listing/create").contentType(MediaType.APPLICATION_JSON);

        MockHttpServletResponse response = getResponse(requestBuilder);
        Assertions.assertNotNull(response);
        Assertions.assertEquals(400, response.getStatus());
    }

    @Test
    public void GetAllListings() throws SQLException, UnsupportedEncodingException, JSONException
    {
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
                .get("/api/listing").contentType(MediaType.APPLICATION_JSON);

        ResultSet result = db.prepareStatement("SELECT COUNT(*) AS count FROM listing")
                .executeQuery();
        Assertions.assertTrue(result.next());
        long count = result.getLong("count");

        MockHttpServletResponse response = getResponse(requestBuilder);
        Assertions.assertNotNull(response);
        JSONArray responseArray = new JSONArray(response.getContentAsString());
        Assertions.assertEquals(count, responseArray.length());
    }

    @Test
    public void GetExistingBookListings() throws JSONException, UnsupportedEncodingException
    {
        // I hate how verbose this is, there must be a better way to do it
        // TODO: Make test more streamlined

        JSONObject listingJSON = new JSONObject();
        listingJSON.put("userId", 35550);
        listingJSON.put("bookIsbn", "2555");
        listingJSON.put("used", false);
        listingJSON.put("condition", Condition.NEW);
        listingJSON.put("conditionDesc", "N/A");
        listingJSON.put("price", 123);

        JSONObject listing1JSON = new JSONObject();
        listing1JSON.put("userId", 35553);
        listing1JSON.put("bookIsbn", "2555");
        listing1JSON.put("used", true);
        listing1JSON.put("condition", Condition.FAIR);
        listing1JSON.put("conditionDesc", "Crease in spine");
        listing1JSON.put("price", 123);

        for (JSONObject json : new JSONObject[]{listingJSON, listing1JSON})
        {
            MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
                    .post("/api/listing/create").contentType(MediaType.APPLICATION_JSON);
            MockHttpServletResponse response = getResponse(requestBuilder, json.toString());
            Assertions.assertNotNull(response);
            Assertions.assertEquals(200, response.getStatus());
        }

        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
                .get("/api/listing/book/2555").contentType(MediaType.APPLICATION_JSON);
        MockHttpServletResponse response = getResponse(requestBuilder);
        Assertions.assertNotNull(response);
        JSONArray responseArray = new JSONArray(response.getContentAsString());

        JSONObject first = responseArray.getJSONObject(0);
        Assertions.assertEquals(123, first.get("price"));
        Assertions.assertEquals(false, first.get("used"));
        Assertions.assertEquals("NEW", first.get("condition"));
        Assertions.assertEquals("N/A", first.get("conditionDesc"));

        JSONObject second = responseArray.getJSONObject(1);
        Assertions.assertEquals(123, second.get("price"));
        Assertions.assertEquals(true, second.get("used"));
        Assertions.assertEquals("FAIR", second.get("condition"));
        Assertions.assertEquals("Crease in spine", second.get("conditionDesc"));
    }

    @Test
    public void GetNonExistingBookListings() throws JSONException, UnsupportedEncodingException
    {
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
                .get("/api/listing/book/8555").contentType(MediaType.APPLICATION_JSON);
        MockHttpServletResponse response = getResponse(requestBuilder);
        Assertions.assertNotNull(response);

        JSONArray responseArray = new JSONArray(response.getContentAsString());
        Assertions.assertEquals(0, responseArray.length());
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