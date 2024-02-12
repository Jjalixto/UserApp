package com.joel.backend.usersapp.backendusersapp.repositories;

import java.util.Optional;
import org.springframework.data.repository.CrudRepository;

import com.joel.backend.usersapp.backendusersapp.models.entities.User;

// se entiendo que esta que busca a los usuarios por id
public interface UserRepository  extends CrudRepository<User,Long>{
     
    //primer metodo sql de spring
    Optional<User> findByUsername(String username);

    //segundo metodo sql hibernet
    // @Query("select u from User u where u.username=?1") //el 1 corresponde al primer parametro osea username
    // Optional<User> getUserByUsername(String username);
}
