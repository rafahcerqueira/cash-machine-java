package com.cashmachine.api.chain;

import com.cashmachine.api.model.User;

public abstract class ValidationHandler {
    protected ValidationHandler next;

    public void setNext(ValidationHandler next) {
        this.next = next;
    }

    public abstract boolean validate(User user);
}
