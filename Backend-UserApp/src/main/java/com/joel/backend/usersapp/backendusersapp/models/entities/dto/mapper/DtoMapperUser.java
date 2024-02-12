package com.joel.backend.usersapp.backendusersapp.models.entities.dto.mapper;

import com.joel.backend.usersapp.backendusersapp.models.entities.User;
import com.joel.backend.usersapp.backendusersapp.models.entities.dto.UserDto;

public class DtoMapperUser {

    private User user;

    private DtoMapperUser(){
    }

    public static DtoMapperUser builder(){
        return new DtoMapperUser();
    }

    public DtoMapperUser setUser(User user){
        this.user = user;
        return this;
    }

    public UserDto build(){
        if(user == null){
            throw new RuntimeException("Debe pasar el entity user!");
        }
        return new UserDto(this.user.getId(), user.getUsername(),user.getEmail());
    }
}
