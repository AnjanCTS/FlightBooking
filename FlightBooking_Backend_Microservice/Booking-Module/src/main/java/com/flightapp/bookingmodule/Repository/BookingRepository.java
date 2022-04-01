package com.flightapp.bookingmodule.Repository;

import com.flightapp.bookingmodule.model.BookingDetails;
import com.flightapp.bookingmodule.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<BookingDetails,Long> {

    @Query("SELECT u FROM BookingDetails u WHERE u.PNR = ?1")
          List<BookingDetails> findByPNR(String PNR);

    @Query("SELECT u FROM BookingDetails u WHERE u.alternateMail = ?1")
         List<BookingDetails> findByMail(String alternateMail);

    @Query("SELECT u FROM BookingDetails u WHERE u.user = ?1")
    Optional<List<BookingDetails>> findByUser(User user);


}
