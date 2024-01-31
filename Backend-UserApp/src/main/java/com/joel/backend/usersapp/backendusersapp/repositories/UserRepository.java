package com.joel.backend.usersapp.backendusersapp.repositories;

import org.springframework.data.repository.CrudRepository;

import com.joel.backend.usersapp.backendusersapp.models.entities.User;

// se entiendo que esta que busca a los usuarios por id
public interface UserRepository  extends CrudRepository<User,Long>{

}
