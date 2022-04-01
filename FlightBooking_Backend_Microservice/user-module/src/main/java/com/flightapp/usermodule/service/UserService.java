package com.flightapp.usermodule.service;

import com.flightapp.usermodule.Repository.UserRepository;
import com.flightapp.usermodule.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    //Create new user
    public User createUser(User user) throws Exception {
       User local = this.userRepository.findByUserName(user.getUserName());
       if(local!=null){
           System.out.println("user is already there");
           throw new Exception("User already present");
       }else{

           local = this.userRepository.save(user);

       }
        return local;
    }

    //get User data by username
    public User getUser(String userName){
        return this.userRepository.findByUserName(userName);
    }

    public void deleteUser(Long userId){
        this.userRepository.deleteById(userId);
    }

    public User updateUser(User user) throws Exception {
        User local = this.userRepository.findByUserName(user.getUserName());
        if(this.userRepository.findById(local.getId()).isPresent()) {
            user.setId(local.getId());
             this.userRepository.save(user);
        }else{
            System.out.println("user not present");
            throw new Exception("User not found");
        }
        return user;
    }

    public Iterable<User> displayAllUser() {
        // TODO Auto-generated method stub
        return this.userRepository.findAll();
    }


}
