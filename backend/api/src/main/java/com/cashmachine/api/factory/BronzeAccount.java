package com.cashmachine.api.factory;

import com.cashmachine.api.model.Account;

public class BronzeAccount extends Account {
    public BronzeAccount(String type, double balance) {
        super(type, "Bronze", balance);
    }
}
