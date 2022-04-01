package com.flightapp.bookingmodule.service;

import com.flightapp.bookingmodule.Repository.BookingRepository;
import com.flightapp.bookingmodule.Repository.ScheduleFlightRepository;
import com.flightapp.bookingmodule.Repository.UserRepository;
import com.flightapp.bookingmodule.model.BookingDetails;
import com.flightapp.bookingmodule.model.ScheduleFlight;
import com.flightapp.bookingmodule.model.TicketDet;
import com.flightapp.bookingmodule.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ScheduleFlightRepository scheduleFlightRepository;

    public BookingDetails createBooking(BookingDetails newBooking) {
        return this.bookingRepository.save(newBooking);
    }

    //get User data by username
    public User getUser(String userName) {
        return this.userRepository.findByUserName(userName);
    }

    //get flight data by flightNumber
    public ScheduleFlight getFlight(Long flightNumber) {
        return this.scheduleFlightRepository.findById(flightNumber).get();
    }

    //get flight data by flightNumber
    public List<BookingDetails> getTicketByPnr(String PNR) {
        return this.bookingRepository.findByPNR(PNR);
    }

    //get flight data by flightNumber
    public List<BookingDetails> getTicketByMail(String mail) {
        List<BookingDetails> alternateMailDet = new ArrayList<BookingDetails>();
        alternateMailDet = this.bookingRepository.findByMail(mail);
        System.out.println("IMPORTANT WARNING : " + alternateMailDet.isEmpty());
        if (alternateMailDet.isEmpty()) {
            User mailUser = userRepository.findByMail(mail);
            Optional<List<BookingDetails>> optionalBookingDetails = this.bookingRepository.findByUser(mailUser);
            if (optionalBookingDetails.isPresent()) {
                return optionalBookingDetails.get();
            }
        }
        return alternateMailDet;
    }

    /*
     * remove an airport
     */
    public void removeTicket(Long id) {
        Optional<BookingDetails> optionalScheduleFlight = bookingRepository.findById(id);
        if (optionalScheduleFlight.isPresent())
            bookingRepository.deleteById(id);
    }

}
