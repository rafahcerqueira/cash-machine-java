package com.cashmachine.api.service;

import com.cashmachine.api.model.User;

import java.util.Optional;

public interface UserService {

    Optional<User> findById(long id);

    Optional<User> findByName(String name);

    void save(User user);

    boolean validateUser(String username, String password);
}
