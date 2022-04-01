package com.flightapp.airportmodule.Controller;

import com.flightapp.airportmodule.model.Airport;
import com.flightapp.airportmodule.service.AirportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/airport")
//@CrossOrigin(origins = {"https://hoppscotch.io", "http://localhost:4200"})
@CrossOrigin("*")
public class AirportController {

    @Autowired
    private AirportService airportService;

    @GetMapping("/test")
    public String test_port(){
        return "Airpot Service";
    }

    @GetMapping("/{id}")
    public Airport viewAirport(@PathVariable("id") String airportCode) throws Exception {
        return airportService.viewAirport(airportCode);
    }

    @GetMapping
    public Iterable<Airport> viewAllAirport() {
        return airportService.viewAllAirport();
    }

    @PostMapping("/add")
    public void addAirport(@RequestBody Airport airport) {
        airportService.addAirport(airport);
    }

    @PutMapping
    public void modifyAirport(@RequestBody Airport airport) throws Exception {
        airportService.modifyAirport(airport);
    }

    @DeleteMapping("/{id}")
    public void removeAirport(@PathVariable("id") String airportCode) throws Exception {
        airportService.removeAirport(airportCode);
    }
}
