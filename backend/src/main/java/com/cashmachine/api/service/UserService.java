package com.cashmachine.api.service;

import com.cashmachine.api.model.User;
import com.cashmachine.api.repository.UserRepository;

import java.sql.SQLException;

public class UserService {
    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findById(int id) throws SQLException {
        return userRepository.findById(id);
    }

    public User findByName(String name) throws SQLException {
        return userRepository.findByName(name);
    }

    public void save(User user) throws SQLException {
        userRepository.save(user);
    }
}
