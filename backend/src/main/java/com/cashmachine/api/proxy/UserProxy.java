package com.cashmachine.api.proxy;

import com.cashmachine.api.model.User;
import com.cashmachine.api.service.UserService;
import java.sql.SQLException;

public class UserProxy {
    private UserService userService;

    public UserProxy(UserService userService) {
        this.userService = userService;
    }

    public boolean validateUser(String username, String password) {
        try {
            User user = userService.findByName(username);
            return user != null && user.getPassword().equals(password);
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
}
