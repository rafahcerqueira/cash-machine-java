package com.cashmachine.api.proxy;

import com.cashmachine.api.service.UserService;
import org.springframework.stereotype.Component;

@Component
public class UserProxy {

    private final UserService userService;

    public UserProxy(UserService userService) {
        this.userService = userService;
    }

    public boolean validateUser(String username, String password) {
        // Usar Optional para verificar se o usuário existe e comparar a senha
        return userService.findByName(username)
            .map(user -> user.getPassword().equals(password))
            .orElse(false);
    }
}
