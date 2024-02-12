package com.joel.backend.usersapp.backendusersapp.repositories;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.joel.backend.usersapp.backendusersapp.models.entities.Role;

// se entiendo que esta que busca a los usuarios por id
public interface RoleRepository  extends CrudRepository<Role,Long>{
     
    Optional<Role> findByName(String name);

}
