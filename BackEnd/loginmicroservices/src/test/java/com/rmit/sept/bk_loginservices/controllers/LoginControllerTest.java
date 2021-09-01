package com.rmit.sept.bk_loginservices.controllers;

import org.json.JSONObject;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;

import java.util.HashMap;
import java.util.Map;

@SpringBootTest
@AutoConfigureMockMvc
class LoginControllerTest
{
    @Autowired
    private MockMvc mvc;

    private JSONObject userJson;
    MockHttpServletRequestBuilder requestBuilder;

    @BeforeEach
    private void setup()
    {
        Map<String,String> map = new HashMap<>();
        map.put("firstName", "");
        map.put("lastName", "");
        map.put("password", "");
        map.put("displayName", "");
        map.put("accountType", "");
        map.put("username", "");
        userJson = new JSONObject(map);

        requestBuilder = MockMvcRequestBuilders
                .post("/api/users/register")
                .contentType(MediaType.APPLICATION_JSON);
    }

    @Test
    @DisplayName("Test should pass when the content is invalid and a 400 is returned")
    public void AllFieldsEmpty() throws Exception
    {
        requestBuilder.content(userJson.toString());

        MockHttpServletResponse response = mvc.perform(requestBuilder)
                .andDo(MockMvcResultHandlers.print())
                .andReturn().getResponse();

        Assertions.assertEquals(response.getStatus(), 400);
    }
}