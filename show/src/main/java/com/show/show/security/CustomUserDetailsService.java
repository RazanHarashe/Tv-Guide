package com.show.show.security;


import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.show.show.models.User;
import com.show.show.repositories.UserRepository;


@Service
public class CustomUserDetailsService implements UserDetailsService {
	
	 @Autowired
	 private UserRepository userRepository;


		@Override
		public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
			// Load user details from the database based on the provided email
			User user = userRepository.findByEmail(email);
			
			// Throw an exception if the user is not found
			if (user == null) {
				throw new UsernameNotFoundException("User not found with email: " + email);
			}
			
			// Create and return a UserDetails object with user details and authorities (roles)
			return new org.springframework.security.core.userdetails.User(
				user.getEmail(), 
				user.getPassword(), 
				Collections.singletonList(new SimpleGrantedAuthority(user.getRole()))
			);
		}
	}