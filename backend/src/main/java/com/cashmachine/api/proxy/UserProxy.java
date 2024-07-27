package com.cashmachine.api.proxy;

import org.springframework.stereotype.Component;
import com.cashmachine.api.service.UserService;

@Component
public class UserProxy {

    private final UserService userService;

    public UserProxy(UserService userService) {
        this.userService = userService;
    }

    public boolean validateUser(String username, String password) {
        return userService.findByName(username)
            .map(user -> user.getPassword().equals(password))
            .orElse(false);
    }
}
