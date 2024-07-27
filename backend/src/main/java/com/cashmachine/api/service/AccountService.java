package com.cashmachine.api.service;

import com.cashmachine.api.model.User;
import com.cashmachine.api.model.Transaction;

import java.math.BigDecimal;
import java.util.List;

public interface AccountService {

    boolean deposit(User user, BigDecimal amount);

    boolean withdraw(User user, BigDecimal amount);

    boolean transfer(User fromUser, User toUser, BigDecimal amount);

    List<Transaction> getTransactionHistory(User user);
}
