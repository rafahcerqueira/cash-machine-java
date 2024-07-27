package com.cashmachine.api.controller;

import com.cashmachine.api.model.User;
import com.cashmachine.api.model.Transaction;
import com.cashmachine.api.service.AccountService;
import com.cashmachine.api.service.UserService;

import java.sql.SQLException;
import java.util.List;

public class AccountController {
    private UserService userService;
    private AccountService accountService;

    public AccountController(UserService userService, AccountService accountService) {
        this.userService = userService;
        this.accountService = accountService;
    }

    public boolean deposit(int userId, double amount) throws SQLException {
        User user = userService.findById(userId);
        return user != null && accountService.deposit(user, amount);
    }

    public boolean withdraw(int userId, double amount) throws SQLException {
        User user = userService.findById(userId);
        return user != null && accountService.withdraw(user, amount);
    }

    public boolean transfer(int fromUserId, int toUserId, double amount) throws SQLException {
        User fromUser = userService.findById(fromUserId);
        User toUser = userService.findById(toUserId);
        return fromUser != null && toUser != null && accountService.transfer(fromUser, toUser, amount);
    }

    public List<Transaction> getTransactionHistory(int userId) throws SQLException {
        User user = userService.findById(userId);
        return user != null ? accountService.getTransactionHistory(user) : null;
    }
}
