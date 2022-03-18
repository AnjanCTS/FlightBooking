package com.flightapp.flightmodule.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class FlightList {

    private Long flightNumber;

    private String Airline;

    private String srcAirport;

    private String dstnAirport;

    private String deptDateTime;

    private String arrDateTime;

    private String availableSeats;

    private String ticketCost;

    private boolean enabled;

}
