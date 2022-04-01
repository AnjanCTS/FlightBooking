package com.flightapp.airportmodule.service;

import com.flightapp.airportmodule.model.Airport;
import com.flightapp.airportmodule.repository.AirportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AirportService {

    @Autowired
    private AirportRepository airportRepository;

   public Airport viewAirport(String airportCode) throws Exception {
       Optional<Airport> local = airportRepository.findById(airportCode);
       if(local.isPresent()){
          return local.get();
       }else{
           throw new Exception("\"Airport with airport code: \" + airportCode + \"not found\"");
       }
   }

    public Iterable<Airport> viewAllAirport() {
        return airportRepository.findAll();
    }

    public ResponseEntity<Airport> addAirport(Airport airport) {
        Optional<Airport> findById = airportRepository.findById(airport.getAirportCode());
        try {
            if (!findById.isPresent()) {
                airportRepository.save(airport);
                return new ResponseEntity<Airport>(airport,HttpStatus.OK);
            }
            else
                throw new Exception(
                        "Airport with code : " + airport.getAirportCode() + " already present");
        }
        catch(Exception e)
        {
            return new ResponseEntity<Airport>(airport, HttpStatus.NOT_FOUND);
        }
    }

    /*
     * modify an Airport
     */
    public Airport modifyAirport(Airport airport) throws Exception {
        Optional<Airport> findById = airportRepository.findById(airport.getAirportCode());
        if (findById.isPresent()) {
            airportRepository.save(airport);
        }
        else
            throw new Exception("Airport with code: " + airport.getAirportCode() + " not found");
        return airport;
    }

    /*
     * remove an airport
     */
    public String removeAirport(String airportCode) throws Exception {
        Optional<Airport> findById = airportRepository.findById(airportCode);
        if (findById.isPresent()) {
            airportRepository.deleteById(airportCode);
            return "Airport removed";
        } else
            throw new Exception("Airport with code: " + airportCode + " not exists");

    }
}
