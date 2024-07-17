package com.show.show.services;

import com.show.show.dto.UserDto;
import com.show.show.models.User;


public interface UserService {
	
    User save(UserDto userDto);
    User findByEmail(String email);

}