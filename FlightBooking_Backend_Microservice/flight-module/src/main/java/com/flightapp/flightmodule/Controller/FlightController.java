package com.flightapp.flightmodule.Controller;

import com.flightapp.flightmodule.model.Airport;
import com.flightapp.flightmodule.model.FlightList;
import com.flightapp.flightmodule.model.ScheduleFlight;
import com.flightapp.flightmodule.service.AirportService;
import com.flightapp.flightmodule.service.ScheduleFlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/flight")
@CrossOrigin("*")
public class FlightController {

    @Autowired
    private AirportService airportService;

    @Autowired
    private ScheduleFlightService scheduleFlightService;

    @GetMapping("/")
    public String test_port() {
        return "flight Service";
    }

    @PostMapping
    public ResponseEntity<ScheduleFlight> addSF(@ModelAttribute ScheduleFlight scheduleFlight,
                                                @RequestParam(name = "srcAirport") String source, @RequestParam(name = "dstnAirport") String destination) {

        System.out.println("inside controller");
        Optional<Airport> local = airportService.findbyName(source);
        System.out.println("inside local" + local.toString());
        if (local.isPresent()) {
            System.out.println("inside first if");
            scheduleFlight.setSrcAirport(local.get());
        } else {
            System.out.println("inside source error");
            return new ResponseEntity("Source Airport Not Found", HttpStatus.BAD_REQUEST);
        }
        local = airportService.findbyName(destination);
        if (local.isPresent()) {
            System.out.println("inside second if");
            scheduleFlight.setDstnAirport(local.get());
        } else {
            System.out.println("inside destination error");
            return new ResponseEntity("Destination Airport Not Found", HttpStatus.BAD_REQUEST);
        }
        if (scheduleFlightService.addScheduledFlight(scheduleFlight.getFlightNumber()).isPresent()) {
            return new ResponseEntity("Flight already present", HttpStatus.BAD_REQUEST);
        }
        try {
            System.out.println("inside last try");
            return new ResponseEntity<ScheduleFlight>(scheduleFlightService.addScheduledFlight(scheduleFlight),
                    HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity("Error adding Flight." + e, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/search")
    public List<ScheduleFlight> searchFlight(
            @RequestParam(name = "srcAirport") String source, @RequestParam(name = "dstnAirport") String destination,
            @RequestParam(name = "deptDateTime") String deptDateTime
    ) throws Exception {
        Optional<Airport> SourceLocal = airportService.findbyName(source);
        if (!(SourceLocal.isPresent())) {
            System.out.println("inside source error");
            // return new ResponseEntity("Source Airport Not Found", HttpStatus.BAD_REQUEST);
            throw new Exception("Source Airport Not Found");
        }
        Optional<Airport> Destinationlocal = airportService.findbyName(destination);
        if (!(Destinationlocal.isPresent())) {
            System.out.println("inside destination error");
            //  return new ResponseEntity("Destination Airport Not Found", HttpStatus.BAD_REQUEST);
            throw new Exception("Destination Airport Not Found");
        }

        return this.scheduleFlightService.SearchFlights(SourceLocal.get(), Destinationlocal.get(), deptDateTime);

    }

    @GetMapping
    public List<FlightList> getAllFlight() {
        return this.scheduleFlightService.getAllFlights();

    }

    @PutMapping
    public ResponseEntity<ScheduleFlight> modifyFlight(@ModelAttribute FlightList flightList) throws Exception {
        System.out.println("inside controller");
        Optional<Airport> local = airportService.findbyName(flightList.getSrcAirport());
        ScheduleFlight scheduleFlight = new ScheduleFlight();
        System.out.println("inside local" + local.toString());
        if (local.isPresent()) {
            System.out.println("inside first if");
            scheduleFlight.setSrcAirport(local.get());
        } else {
            System.out.println("inside source error");
            return new ResponseEntity("Source Airport Not Found", HttpStatus.BAD_REQUEST);
        }
        local = airportService.findbyName(flightList.getDstnAirport());
        if (local.isPresent()) {
            System.out.println("inside second if");
            scheduleFlight.setDstnAirport(local.get());
        } else {
            System.out.println("inside destination error");
            return new ResponseEntity("Destination Airport Not Found", HttpStatus.BAD_REQUEST);
        }
        try {
            System.out.println("inside last try" + flightList.getAirline());
            System.out.println("+++++++++******************************");
            System.out.println(flightList.toString());
            scheduleFlight.setFlightNumber(flightList.getFlightNumber());
            scheduleFlight.setAirline(flightList.getAirline());
            scheduleFlight.setDeptDateTime(flightList.getDeptDateTime());
            scheduleFlight.setAvailableSeats(flightList.getAvailableSeats());
            scheduleFlight.setTicketCost(flightList.getTicketCost());
            scheduleFlight.setEnabled(flightList.isEnabled());
            return new ResponseEntity<ScheduleFlight>(scheduleFlightService.modifyFlight(scheduleFlight),
                    HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity("Error adding Flight." + e, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    public void removeFlight(@PathVariable("id") Long flightNumber) {
        scheduleFlightService.removeFlight(flightNumber);
    }
}
