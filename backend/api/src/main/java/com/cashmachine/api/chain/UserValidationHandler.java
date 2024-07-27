package com.cashmachine.api.chain;

import com.cashmachine.model.User;

public class UserValidationHandler extends ValidationHandler {
    @Override
    public boolean validate(User user) {
        if (user.getName() == null || user.getName().isEmpty()) {
            return false;
        }
        return next != null ? next.validate(user) : true;
    }
}
