package com.flightapp.flightmodule.service;

import com.flightapp.flightmodule.Repository.AirportRepository;
import com.flightapp.flightmodule.Repository.ScheduleFlightRepository;
import com.flightapp.flightmodule.model.Airport;
import com.flightapp.flightmodule.model.FlightList;
import com.flightapp.flightmodule.model.ScheduleFlight;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ScheduleFlightService {

    @Autowired
    private ScheduleFlightRepository scheduleFlightRepository;

    @Autowired
    private AirportRepository airportRepository;
    /*
     * Service method to add new Scheduled flight to database
     */
    public ScheduleFlight addScheduledFlight(ScheduleFlight scheduleFlight) {
        return scheduleFlightRepository.save(scheduleFlight);
    }

    /*
     * Service method to view all Scheduled flights in database
     */
    public List<ScheduleFlight> SearchFlights(Airport source, Airport destination,String deptDateTime) {
        return scheduleFlightRepository.searchFlight(source,destination,deptDateTime);
    }
    /*
     * Service method to add new Scheduled flight to database
     */
    public Optional<ScheduleFlight> addScheduledFlight(Long scheduleFlightId) {
        return scheduleFlightRepository.findById(scheduleFlightId);
    }

    public List<FlightList> getAllFlights() {
       List<ScheduleFlight> scheduleFlights =   scheduleFlightRepository.findAll();
       scheduleFlights.forEach(System.out::println);
       FlightList flightList  = new FlightList();
       List<FlightList> flight = new ArrayList<FlightList>();
        Airport airport = new Airport();
        for (ScheduleFlight scheduleFlight : scheduleFlights) {
            flightList = new FlightList();
            airport = airportRepository.findByAirportCode(scheduleFlight.getSrcAirport().getAirportCode());
            flightList.setSrcAirport(airport.getAirportName());
            airport = airportRepository.findByAirportCode(scheduleFlight.getDstnAirport().getAirportCode());
            flightList.setDstnAirport(airport.getAirportName());

            flightList.setFlightNumber(scheduleFlight.getFlightNumber());
            flightList.setAirline(scheduleFlight.getAirline());

            flightList.setDeptDateTime(scheduleFlight.getDeptDateTime());
            flightList.setAvailableSeats(scheduleFlight.getAvailableSeats());
            flightList.setTicketCost(scheduleFlight.getTicketCost());
            flightList.setEnabled(scheduleFlight.isEnabled());
            flight.add(flightList);
        }
       return flight;
    }

    /*
     * modify an Airport
     */
    public ScheduleFlight modifyFlight(ScheduleFlight scheduleFlight) throws Exception {
        Optional<ScheduleFlight> optionalScheduleFlight = scheduleFlightRepository.findById(scheduleFlight.getFlightNumber());
        if (optionalScheduleFlight.isPresent()) {
            scheduleFlightRepository.save(scheduleFlight);
        }
        else
            throw new Exception("Flight with FlightNumber: " + scheduleFlight.getFlightNumber() + " not found");
        return optionalScheduleFlight.get();
    }
    /*
     * remove an airport
     */
    public void removeFlight(Long id) {
        Optional<ScheduleFlight> optionalScheduleFlight = scheduleFlightRepository.findById(id);
        if (optionalScheduleFlight.isPresent())
            scheduleFlightRepository.deleteById(id);
    }
}
