package com.cashmachine.api.chain;

import com.cashmachine.api.model.User;

public class AccountValidationHandler extends ValidationHandler {

    @Override
    public boolean validate(User user) {
        if (user.getAccountType() == null || user.getAccountType().getType().isEmpty()) {
            return false;
        }
        return next != null ? next.validate(user) : true;
    }
}
