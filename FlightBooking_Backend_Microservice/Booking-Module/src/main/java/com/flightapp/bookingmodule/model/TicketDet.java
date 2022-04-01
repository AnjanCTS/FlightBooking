package com.flightapp.bookingmodule.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class TicketDet {

    private String PNR;

    private String NoOfPassenger;

    private String alternateMail;

    private String bookingDate;

    private String bookClass;

    private String userName;
    private String name;
    private String email;
    private String phone;
    private String UserRole;

    private boolean userEnabled;

    private Long flightNumber;

    private String Airline;

    private String srcAirportName;

    private String dstnAirportName;

    private String deptDateTime;

    private String arrDateTime;

    private String availableSeats;

    private String ticketCost;

    private boolean flightEnabled;

}
