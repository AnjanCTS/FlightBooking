package com.flightapp.bookingmodule.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@ToString
@AllArgsConstructor
@Table(name = "BookingDetails",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "PNR")
        })
public class BookingDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long bookingId;


    private String PNR;

    private String NoOfPassenger;

    @OneToOne(fetch = FetchType.EAGER)
    private User user;

    @OneToOne(fetch = FetchType.EAGER)
    private ScheduleFlight scheduleFlight;

    private String alternateMail;

    private String bookingDate;

    private String bookClass;

}
