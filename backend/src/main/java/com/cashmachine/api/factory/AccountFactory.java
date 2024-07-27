package com.cashmachine.api.factory;

import com.cashmachine.api.model.Account;

public abstract class AccountFactory {
    public abstract Account createAccount(String accountType, String accountLevel);
}
