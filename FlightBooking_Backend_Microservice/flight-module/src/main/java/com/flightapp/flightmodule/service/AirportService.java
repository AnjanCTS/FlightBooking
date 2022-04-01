package com.flightapp.flightmodule.service;

import com.flightapp.flightmodule.Repository.AirportRepository;
import com.flightapp.flightmodule.model.Airport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AirportService {

    @Autowired
    private AirportRepository airportRepository;

    public Optional<Airport> findbyName(String airportName){
        System.out.println("inside Service "+airportName);
        return airportRepository.findByAirportName(airportName);
    }
}
