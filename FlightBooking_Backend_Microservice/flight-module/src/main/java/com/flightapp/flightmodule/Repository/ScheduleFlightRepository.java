package com.flightapp.flightmodule.Repository;

import com.flightapp.flightmodule.model.Airport;
import com.flightapp.flightmodule.model.ScheduleFlight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScheduleFlightRepository extends JpaRepository<ScheduleFlight,Long> {

    @Query("SELECT u FROM ScheduleFlight u WHERE u.srcAirport = ?1 and u.dstnAirport = ?2 and u.deptDateTime = ?3")
    List<ScheduleFlight> searchFlight(Airport srcAirport, Airport dstnAirport,String deptDateTime);
}
