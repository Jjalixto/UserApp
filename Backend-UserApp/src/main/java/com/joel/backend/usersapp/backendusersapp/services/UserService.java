package com.joel.backend.usersapp.backendusersapp.services;

import java.util.List;
import java.util.Optional;

import com.joel.backend.usersapp.backendusersapp.models.dto.UserDto;
import com.joel.backend.usersapp.backendusersapp.models.entities.User;
import com.joel.backend.usersapp.backendusersapp.models.request.UserRequest;

public interface UserService {

    List<UserDto> findAll();
    
    Optional<UserDto> findById(Long id);

    UserDto save(User user);

    Optional<UserDto> update(UserRequest user, Long id);

    void remove(Long id);
}
