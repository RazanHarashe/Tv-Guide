package com.show.show.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.show.show.dto.UserDto;
import com.show.show.models.User;
import com.show.show.repositories.UserRepository;


@Service // Marks this class as a Spring service
public class UserServiceImpl implements UserService {
    
    @Autowired // Injects the PasswordEncoder bean
    private PasswordEncoder passwordEncoder;
    
    @Autowired // Injects the UserRepository bean
    private UserRepository userRepository;

    @Override
    public User save(UserDto userDto) { // Implements the save method
        if (userDto.getPassword() == null) {
            throw new IllegalArgumentException("Password cannot be null"); // Validates password
        }
        User user = new User(userDto.getEmail(), passwordEncoder.encode(userDto.getPassword()), userDto.getRole(), userDto.getFullname()); // Creates a new User object
        return userRepository.save(user); // Saves the user to the database
    }

    @Override
    public User findByEmail(String email) { // Implements the findByEmail method
        return userRepository.findByEmail(email); // Finds a user by email
    }
    
    @Override
    public User updateUser(Long id, UserDto userDto) { // Implements the updateUser method
        Optional<User> optionalUser = userRepository.findById(id); // Finds the user by ID
        if (optionalUser.isPresent()) { // Checks if the user exists
            User user = optionalUser.get();
            
            if (userDto.getEmail() != null) {
                user.setEmail(userDto.getEmail()); // Updates email if provided
            }
            if (userDto.getPassword() != null) {
                user.setPassword(passwordEncoder.encode(userDto.getPassword())); // Updates password if provided
            }
            if (userDto.getRole() != null) {
                user.setRole(userDto.getRole()); // Updates role if provided
            }
            if (userDto.getFullname() != null) {
                user.setFullname(userDto.getFullname()); // Updates fullname if provided
            }
            
            return userRepository.save(user); // Saves the updated user to the database
        }
        return null; // Returns null if user not found
    }

    @Override
    public void deleteUser(Long id) { // Implements the deleteUser method
        userRepository.deleteById(id); // Deletes the user by ID
    }

    @Override
    public List<User> getAllUsers() { // Implements the getAllUsers method
        return userRepository.findAll(); // Retrieves all users
    }

    @Override
    public User getUserById(Long id) { // Implements the getUserById method
        return userRepository.findById(id).orElse(null); // Retrieves a user by ID or returns null if not found
    }

}