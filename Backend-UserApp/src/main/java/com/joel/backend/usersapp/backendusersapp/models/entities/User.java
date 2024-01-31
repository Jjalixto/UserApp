package com.joel.backend.usersapp.backendusersapp.models.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //valida not empty es para validar si es que no este vacio acepta espacios en blanco
    @NotBlank
    @Size(min = 4, max = 12)
    @Column(unique = true ,name = "username")
    private String username;

    //que no sea un string con espacio en blanco
    @NotBlank
    @Column(name = "password")
    private String password;

    @NotEmpty
    @Email
    @Column(unique = true ,name = "email")
    private String email;
}
