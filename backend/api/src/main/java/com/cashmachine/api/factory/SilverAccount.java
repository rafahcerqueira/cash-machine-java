package com.cashmachine.api.factory;

import com.cashmachine.api.model.Account;

public class SilverAccount extends Account {
    public SilverAccount(String type, double balance) {
        super(type, "Silver", balance);
    }
}
