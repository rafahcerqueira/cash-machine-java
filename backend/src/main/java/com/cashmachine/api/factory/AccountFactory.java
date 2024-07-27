package com.cashmachine.api.factory;

import com.cashmachine.api.model.Account;
import com.cashmachine.api.model.CheckingAccount;
import com.cashmachine.api.model.SavingsAccount;

public class AccountFactory {

    public static Account createAccount(String type, String level, double balance) {
        switch (type) {
            case "Checking":
                return new CheckingAccount(level, balance);
            case "Savings":
                return new SavingsAccount(level, balance);
            default:
                throw new IllegalArgumentException("Unknown account type: " + type);
        }
    }
}
