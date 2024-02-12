package com.joel.backend.usersapp.backendusersapp.models.entities.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserDto {

    private Long id;
    private String name;
    private String email;
}
