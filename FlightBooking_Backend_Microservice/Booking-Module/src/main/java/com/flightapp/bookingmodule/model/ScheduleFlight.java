package com.flightapp.bookingmodule.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Entity
@ToString
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleFlight {

    @Id
    private Long flightNumber;

    private String Airline;

    @OneToOne(fetch = FetchType.EAGER)
    private Airport srcAirport;

    @OneToOne(fetch = FetchType.EAGER)
    private Airport dstnAirport;

    private String deptDateTime;

    private String arrDateTime;

    private String availableSeats;

    private String ticketCost;

    private boolean enabled=true;

}
