package com.rmit.sept.bk_listingservice.listingmicroservice.controller;

import com.rmit.sept.bk_listingservice.listingmicroservice.model.Condition;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
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

    @Test
    public void CreateValidSellListing() throws JSONException
    {
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
                .post("/api/listing/create/sell").contentType(MediaType.APPLICATION_JSON);

        JSONObject listingJSON = new JSONObject();
        listingJSON.put("userId", 35550);
        listingJSON.put("bookIsbn", "1555");
        listingJSON.put("used", false);
        listingJSON.put("cond", Condition.NEW);
        listingJSON.put("condDesc", "N/A");
        listingJSON.put("price", 123);

        MockHttpServletResponse response = getResponse(requestBuilder, listingJSON.toString());
        Assertions.assertNotNull(response);
        Assertions.assertEquals(200, response.getStatus());

        Assertions.assertTrue(deleteSellListing("1555"));
    }

    @Test
    public void CreateSellListingMissingId() throws JSONException
    {
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
                .post("/api/listing/create/sell").contentType(MediaType.APPLICATION_JSON);

        JSONObject listingJSON = new JSONObject();
        listingJSON.put("used", false);
        listingJSON.put("cond", Condition.NEW);
        listingJSON.put("condDesc", "N/A");
        listingJSON.put("price", 123);

        MockHttpServletResponse response = getResponse(requestBuilder, listingJSON.toString());
        Assertions.assertNotNull(response);
        Assertions.assertEquals(400, response.getStatus());
    }

    @Test
    public void CreateEmptySellListing()
    {
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
                .post("/api/listing/create/sell").contentType(MediaType.APPLICATION_JSON);

        MockHttpServletResponse response = getResponse(requestBuilder, "");
        Assertions.assertNotNull(response);
        Assertions.assertEquals(400, response.getStatus());
    }

    @Test
    public void GetAllListings() throws SQLException, UnsupportedEncodingException, JSONException
    {
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
                .get("/api/listing").contentType(MediaType.APPLICATION_JSON);

        ResultSet result = db.prepareStatement("SELECT COUNT(*) AS count FROM sell_listing")
                .executeQuery();
        Assertions.assertTrue(result.next());
        long count = result.getLong("count");

        MockHttpServletResponse response = getResponse(requestBuilder, "");
        Assertions.assertNotNull(response);
        JSONArray responseArray = new JSONArray(response.getContentAsString());
        Assertions.assertEquals(count, responseArray.length());
    }

    private boolean deleteSellListing(String bookIsbn)
    {
        try
        {
            PreparedStatement statement = db.prepareStatement(
                    "SELECT id FROM listing WHERE book_isbn" + " = '" + bookIsbn + "'");
            ResultSet result = statement.executeQuery();
            if (result.next())
            {
                long id = result.getLong("id");
                db.prepareStatement("DELETE FROM listing WHERE id = '" + id + "'").execute();
                db.prepareStatement("DELETE FROM sell_listing WHERE listing_id = '" + id + "'")
                        .execute();

                return true;
            } else
                return false;
        } catch (SQLException e)
        {
            e.printStackTrace();
        }
        return false;
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