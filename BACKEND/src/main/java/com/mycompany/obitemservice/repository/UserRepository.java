package com.mycompany.obitemservice.repository;

import com.mycompany.obitemservice.controller.User.user;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository <user, Integer>{
    Optional<user> findByEmail(String email);

}
