package com.flightapp.airportmodule.controller;

import com.flightapp.airportmodule.model.Airport;
import com.flightapp.airportmodule.service.AirportService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(AirportController.class)
public class AirportControllerWebTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AirportService airportService;


    @Test
    public void testPort_Test() throws Exception {
        RequestBuilder request = MockMvcRequestBuilders.get("/airport/test");
        MvcResult result = mockMvc.perform(request).andReturn();
        System.out.println(result.getResponse().getContentAsString());
        assertEquals("Airport Service", result.getResponse().getContentAsString());

    }

    @Test
    public void  viewAirportTest() throws Exception {
        when(airportService.viewAirport("307")).
                thenReturn(new Airport("307","Mah","Pun"));

        RequestBuilder request = MockMvcRequestBuilders.get("/airport/307").accept(MediaType.APPLICATION_JSON);
        MvcResult result = mockMvc.perform(request).
                andExpect(status().isOk()).
                andExpect(content().json("{\"airportCode\":\"307\",\"airportState\":\"Mah\",\"airportName\":\"Pun\"}")).
                andReturn();
        System.out.println(result.getResponse().getContentAsString());


    }

    @Test
    public void  viewAllAirportTest() throws Exception {
        when(airportService.viewAllAirport()).
                thenReturn(Arrays.asList(new Airport("307","Mah","Pun"),
                        new Airport("308","Mah","Nag")));

        RequestBuilder request = MockMvcRequestBuilders.get("/airport").accept(MediaType.APPLICATION_JSON);
        MvcResult result = mockMvc.perform(request).
                andExpect(status().isOk()).
                andExpect(content().json("[{\"airportCode\":\"307\",\"airportState\":\"Mah\",\"airportName\":\"Pun\"},{}]")).
                andReturn();
        System.out.println(result.getResponse().getContentAsString());


    }


}