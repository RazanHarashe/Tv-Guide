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

    @PostMapping("/admin_users") // Maps HTTP POST requests to /admin_users to this method
    public ResponseEntity<User> addUser(@RequestBody UserDto userDto) { // Binds the HTTP request body to the UserDto parameter
        User savedUser = userService.save(userDto); // Calls the save method of UserService to save the user
        return ResponseEntity.ok(savedUser); // Returns a success response with the saved user
    }

    @PutMapping("/admin_users/{id}") // Maps HTTP PUT requests to /admin_users/{id} to this method
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody UserDto userDto) { // Binds the {id} path variable and the request body to the respective parameters
        User updatedUser = userService.updateUser(id, userDto); // Calls the updateUser method of UserService to update the user
        return ResponseEntity.ok(updatedUser); // Returns a success response with the updated user
    }

    @DeleteMapping("/admin_users/{id}") // Maps HTTP DELETE requests to /admin_users/{id} to this method
    public ResponseEntity<String> deleteUser(@PathVariable Long id) { // Binds the {id} path variable to the parameter
        try {
            userService.deleteUser(id); // Calls the deleteUser method of UserService to delete the user
            return ResponseEntity.ok("deleted Successfully!"); // Returns a success response with a message
        } catch (Exception e) { // Catches any exceptions thrown during the deletion
            return ResponseEntity.badRequest().body("deleted error"); // Returns a bad request response with an error message
        }
    }

    @GetMapping("/admin_users") // Maps HTTP GET requests to /admin_users to this method
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers(); // Calls the getAllUsers method of UserService to get all users
        return ResponseEntity.ok(users); // Returns a success response with the list of users
    }

    @GetMapping("/admin_users/{id}") // Maps HTTP GET requests to /admin_users/{id} to this method
    public ResponseEntity<User> getUserById(@PathVariable Long id) { // Binds the {id} path variable to the parameter
        User user = userService.getUserById(id); // Calls the getUserById method of UserService to get the user by id
        return ResponseEntity.ok(user); // Returns a success response with the user
    }
}


