package com.flightapp.airportmodule.controller;

import com.flightapp.airportmodule.model.Airport;
import com.flightapp.airportmodule.service.AirportService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class AirportControllerTest {

    @InjectMocks
    AirportController airportController;
    @Mock
    AirportService airportService;

    @Test
     public void  viewAirportTest() throws Exception {

        when(airportService.viewAirport("307")).thenReturn(new Airport("307","Mah","Pun"));

        Airport expectedAirport = new Airport("307", "Mah", "Pun");
        assertEquals(expectedAirport, airportController.viewAirport("307"));
    }

    @Test
    public void testPortTest(){
        assertEquals("Airport Service", airportController.testPort());
    }


}