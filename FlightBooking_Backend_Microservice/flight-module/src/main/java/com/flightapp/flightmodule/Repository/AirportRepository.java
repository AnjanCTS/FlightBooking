package com.flightapp.flightmodule.Repository;

import com.flightapp.flightmodule.model.Airport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AirportRepository extends JpaRepository<Airport,String> {
    @Query("SELECT u FROM Airport u WHERE u.airportName = ?1")
    public Optional<Airport> findByAirportName(String airportName);

    @Query("SELECT u FROM Airport u WHERE u.airportCode = ?1")
    public Airport findByAirportCode(String airportCode);

}
