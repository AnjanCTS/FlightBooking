package com.flightapp.usermodule.Repository;

import com.flightapp.usermodule.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    public User findByUserName(String userName);
}
