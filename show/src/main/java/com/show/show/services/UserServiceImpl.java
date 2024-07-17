package com.show.show.services;

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
    
 
}