package com.flightapp.bookingmodule.controller;

import com.flightapp.bookingmodule.model.BookingDetails;
import com.flightapp.bookingmodule.model.ScheduleFlight;
import com.flightapp.bookingmodule.model.User;
import com.flightapp.bookingmodule.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.time.Instant;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/book")
//@CrossOrigin(origins = {"https://hoppscotch.io", "http://localhost:4200"})
@CrossOrigin("*")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @Autowired
    private RestTemplate restTemplate;


    String url = "http://FLIGHT-SERVICE/flight/searchFlight";

    @GetMapping("/search")
    public List<ScheduleFlight> searchFlight(
            @RequestParam(name = "srcAirport") String source, @RequestParam(name = "dstnAirport") String destination
            , @RequestParam(name = "deptDateTime") String deptDateTime
    ) {
        // URI (URL) parameters
//        Map<String, String> urlParams = new HashMap<>();
//        urlParams.put("planet", "Mars");
//        urlParams.put("moon", "Phobos");

        // Query parameters
        UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(url)
                // Add query parameter
                .queryParam("srcAirport", source)
                .queryParam("dstnAirport", destination)
                .queryParam("deptDateTime", deptDateTime);

        System.out.println(builder.buildAndExpand().toUri());
/**
 * Console output:
 * http://test.com/solarSystem/planets/Mars/moons/Phobos?firstName=Mark&lastName=Watney
 */

        ResponseEntity<List<ScheduleFlight>> res = restTemplate.exchange(builder.buildAndExpand().toUri(), HttpMethod.GET,
                new HttpEntity<>(null), new ParameterizedTypeReference<List<ScheduleFlight>>() {
                });

        System.out.println("schedule search : " + res.getBody());
        return res.getBody();

    }


    @PostMapping("/add")
    public BookingDetails addBooking(@RequestBody BookingDetails newBooking,
                                     @RequestParam(name = "userName") String userName,
                                     @RequestParam(name = "flightNumber") Long flightNumber) {

        //PNR logic
        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME
                .withZone(ZoneId.from(ZoneOffset.UTC));

        Instant instant = Instant.now();
        String a = formatter.format(instant);

        String[] arr = a.split("T");
        String[] date = arr[0].split("-");
        String[] time = arr[1].split(":");

        String pnr = date[0].substring(2) + date[1] + date[2] + time[0] + time[1] + (time[2].split("\\."))[0];

        System.out.println(pnr);
        newBooking.setPNR(pnr);
        System.out.println("newBooking *(*(*( " + newBooking.toString());
        //User details
        User user = new User();
        user = bookingService.getUser(userName);
        System.out.println("user *(*(*( " + user.toString());
        //flight details
        ScheduleFlight scheduleFlight = new ScheduleFlight();
        scheduleFlight = bookingService.getFlight(flightNumber);
        System.out.println("scheduleFlight *(*(*( " + scheduleFlight.toString());

        newBooking.setBookingDate(arr[0]);
        newBooking.setUser(user);
        newBooking.setScheduleFlight(scheduleFlight);
        System.out.println("newBooking *(*(*( " + newBooking.toString());
        return bookingService.createBooking(newBooking);
    }

    @GetMapping("/pnr/{PNR}")
    public List<BookingDetails> getTicketByPnr(@PathVariable("PNR") String PNR) {
        return bookingService.getTicketByPnr(PNR);
    }

    @GetMapping("/mail/{Mail}")
    public List<BookingDetails> getTicketByMail(@PathVariable("Mail") String Mail) {
        return bookingService.getTicketByMail(Mail);
    }

    @DeleteMapping("/{id}")
    public void removeFlight(@PathVariable("id") Long bookingId) {
        bookingService.removeTicket(bookingId);
    }
}
