package com.flightapp.bookingmodule.Repository;


import com.flightapp.bookingmodule.model.BookingDetails;
import com.flightapp.bookingmodule.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    public User findByUserName(String userName);

    @Query("SELECT u FROM User u WHERE u.email = ?1")
    User findByMail(String Email);
}
