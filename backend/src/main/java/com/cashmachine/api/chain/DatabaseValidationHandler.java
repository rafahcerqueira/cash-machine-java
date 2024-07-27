package com.cashmachine.api.chain;

import com.cashmachine.api.model.User;
import com.cashmachine.api.service.UserService;
import org.springframework.stereotype.Component;

@Component
public class DatabaseValidationHandler extends ValidationHandler {

    private final UserService userService;

    public DatabaseValidationHandler(UserService userService) {
        this.userService = userService;
    }

    @Override
    public boolean validate(User user) {
        // Verifique se o usuário está presente no banco de dados usando Optional
        return userService.findByName(user.getName())
                .map(dbUser -> next != null ? next.validate(dbUser) : true)
                .orElse(false);
    }
}
