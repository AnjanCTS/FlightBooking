package com.flightapp.usermodule.Controller;

import com.flightapp.usermodule.model.User;
import com.flightapp.usermodule.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;


    @PostMapping
    public User createUser(@RequestBody  User user) throws Exception {
        return this.userService.createUser(user);
    }

    @GetMapping("/{userName}")
    public User getUser(@PathVariable("userName") String userName ){
        return this.userService.getUser(userName);
    }

    @GetMapping
    public Iterable<User> readAllUsers() {

        return userService.displayAllUser();
    }

    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable("userId") Long userId){
        this.userService.deleteUser(userId);
    }

   @PutMapping("/updateUser")
    public User updateUSer(@RequestBody User user) throws Exception {
        return this.userService.updateUser(user);
   }

}
