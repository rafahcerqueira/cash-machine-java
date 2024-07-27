package com.cashmachine.api.service;

import com.cashmachine.api.model.User;
import com.cashmachine.api.repository.UserRepository;
import com.cashmachine.api.proxy.UserProxy;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserProxy userProxy;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, UserProxy userProxy) {
        this.userRepository = userRepository;
        this.userProxy = userProxy;
    }

    @Override
    public Optional<User> findById(long id) {
        return userRepository.findById(id);
    }

    @Override
    public Optional<User> findByName(String name) {
        return userRepository.findByName(name);
    }

    @Override
    public void save(User user) {
        userRepository.save(user);
    }

    @Override
    public boolean validateUser(String username, String password) {
        return userProxy.validateUser(username, password);
    }
}
