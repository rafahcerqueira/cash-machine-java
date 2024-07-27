package com.cashmachine.api.chain;

import com.cashmachine.api.model.User;
import com.cashmachine.api.service.UserService;

public class DatabaseValidationHandler extends ValidationHandler {
    private UserService userService;

    public DatabaseValidationHandler(UserService userService) {
        this.userService = userService;
    }

    @Override
    public boolean validate(User user) {
        User dbUser = userService.findByName(user.getName());
        if (dbUser == null) {
            return false;
        }
        return next != null ? next.validate(dbUser) : true;
    }
}
