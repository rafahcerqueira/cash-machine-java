package com.cashmachine.api.factory;

import com.cashmachine.api.model.Account;

public class GoldAccount extends Account {
    public GoldAccount(String type, double balance) {
        super(type, "Gold", balance);
    }
}
