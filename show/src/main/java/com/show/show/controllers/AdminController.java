package com.show.show.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.show.show.dto.UserDto;
import com.show.show.models.User;
import com.show.show.services.UserService;

@RestController // Marks the class as a controller where every method returns a domain object instead of a view
public class AdminController {

    @Autowired // Injects the UserService dependency
    private UserService userService;

    @Autowired // Injects the AuthenticationManager dependency
    private AuthenticationManager authenticationManager;


    @GetMapping("/auth-status") // Maps HTTP GET requests to /auth-status to this method
    public Map<String, Object> authStatus() {
        Map<String, Object> response = new HashMap<>(); // Creates a response map to hold authentication status
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication(); // Gets the current authentication object
        response.put("isAuthenticated", authentication != null && authentication.isAuthenticated()); // Adds authentication status to the response map
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) { // Checks if the authentication object is not null and the principal is an instance of UserDetails
            UserDetails userDetails = (UserDetails) authentication.getPrincipal(); // Casts the principal to UserDetails //the primary user information
            response.put("isAdmin", userDetails.getAuthorities().stream()
                .anyMatch(authority -> authority.getAuthority().equals("ADMIN"))); // Checks if the user has the ADMIN role and adds the result to the response map
        } else {
            response.put("isAdmin", false); // If the principal is not an instance of UserDetails, sets isAdmin to false
        }
        return response; // Returns the response map
    }

    @PostMapping("/adminlogin") // Maps HTTP POST requests to /adminlogin to this method
    public ResponseEntity<?> loginAdmin(@RequestBody User user) { // Binds the HTTP request body to the User parameter
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()) // Creates an authentication token with the user's email and password
            );
            SecurityContextHolder.getContext().setAuthentication(authentication); // Sets the authentication in the security context
            UserDetails userDetails = (UserDetails) authentication.getPrincipal(); // Gets the UserDetails from the authentication object
            
            // Check if the user has the "ADMIN" role
            boolean isAdmin = userDetails.getAuthorities().stream()
                .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ADMIN"));
            
            if (isAdmin) {
                return ResponseEntity.ok("Login successful for admin: " + userDetails.getUsername()); // Returns a success response with a message
            } else {
                SecurityContextHolder.clearContext(); // Clears the security context if the user is not an admin
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied: User is not an admin"); // Returns a forbidden response with a message
            }
        } catch (Exception e) { // Catches any exceptions thrown during authentication
            return ResponseEntity.badRequest().body("Invalid email or password"); // Returns a bad request response with an error message
        }
    }

}

