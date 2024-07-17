package com.show.show.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.show.show.dto.UserDto;
import com.show.show.models.User;
import com.show.show.services.UserService;

@Controller // Marks the class as a Spring MVC controller
public class UserController {

    @Autowired // Injects the UserService dependency
    private UserService userService;

    @Autowired // Injects the AuthenticationManager dependency
    private AuthenticationManager authenticationManager;


    @PostMapping("/registration") // Maps HTTP POST requests to /registration to this method
    public ResponseEntity<String> saveUser(@RequestBody UserDto userDto) { // Binds the HTTP request body to the UserDto parameter
        System.out.println("Received password: " + userDto.getPassword()); // Logs the received password to the console (for debugging purposes)
        userService.save(userDto); // Calls the save method of UserService to save the user
        return ResponseEntity.ok("Registered Successfully!"); // Returns a success response with a message
    }
    
    @PostMapping("/login") // Maps HTTP POST requests to /login to this method
    public ResponseEntity<String> loginUser(@RequestBody User user) { // Binds the HTTP request body to the User parameter
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()) // Creates an authentication token with the user's email and password
            );
            SecurityContextHolder.getContext().setAuthentication(authentication); // Sets the authentication in the security context
            return ResponseEntity.ok("Login successful"); // Returns a success response with a message
        } catch (Exception e) { // Catches any exceptions thrown during authentication
            return ResponseEntity.badRequest().body("Invalid email or password"); // Returns a bad request response with an error message
        }
    }
}

