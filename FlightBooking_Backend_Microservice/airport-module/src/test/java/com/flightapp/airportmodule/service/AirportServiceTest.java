package com.flightapp.airportmodule.service;

import com.flightapp.airportmodule.model.Airport;
import com.flightapp.airportmodule.repository.AirportRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.Arrays;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class AirportServiceTest {

    @InjectMocks
    private AirportService airportService;

    @Mock
    AirportRepository airportRepository;

    @Test
    public void viewAirportTest() throws Exception {
        when(airportRepository.findById("307")).thenReturn(Optional.of(new Airport("307", "Mah", "Pun")));
        assertEquals(new Airport("307","Mah","Pun"),airportService.viewAirport("307"));


    }

    @Test
    public void viewAllAirportTest() throws Exception {
        when(airportRepository.findAll()).thenReturn(Arrays.asList(new Airport("307","Mah","Pun")));
        Iterable<Airport> result =  airportService.viewAllAirport();
        assertEquals(Arrays.asList(new Airport("307","Mah","Pun")),result);


    }

}