package com.show.show.services;

import java.util.List;

import com.show.show.dto.UserDto;
import com.show.show.models.User;


public interface UserService {
	
    User save(UserDto userDto);
    User findByEmail(String email);
    User updateUser(Long id, UserDto userDto);
    void deleteUser(Long id);
    List<User> getAllUsers();
    User getUserById(Long id);

}