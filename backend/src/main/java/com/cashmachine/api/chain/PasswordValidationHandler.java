package com.cashmachine.api.chain;

import com.cashmachine.api.model.User;

public class PasswordValidationHandler extends ValidationHandler {
    @Override
    public boolean validate(User user) {
        if (user.getPassword() == null || user.getPassword().length() < 8) {
            return false;
        }
        return next != null ? next.validate(user) : true;
    }
}
