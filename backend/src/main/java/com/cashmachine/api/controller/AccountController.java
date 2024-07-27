package com.cashmachine.api.controller;

import com.cashmachine.api.model.User;
import com.cashmachine.api.model.Transaction;
import com.cashmachine.api.service.AccountService;
import com.cashmachine.api.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    private final UserService userService;
    private final AccountService accountService;

    public AccountController(UserService userService, AccountService accountService) {
        this.userService = userService;
        this.accountService = accountService;
    }

    @PostMapping("/{userId}/deposit")
    public boolean deposit(@PathVariable int userId, @RequestParam double amount) throws SQLException {
        User user = userService.findById(userId);
        return user != null && accountService.deposit(user, amount);
    }

    @PostMapping("/{userId}/withdraw")
    public boolean withdraw(@PathVariable int userId, @RequestParam double amount) throws SQLException {
        User user = userService.findById(userId);
        return user != null && accountService.withdraw(user, amount);
    }

    @PostMapping("/transfer")
    public boolean transfer(@RequestParam int fromUserId, @RequestParam int toUserId, @RequestParam double amount) throws SQLException {
        User fromUser = userService.findById(fromUserId);
        User toUser = userService.findById(toUserId);
        return fromUser != null && toUser != null && accountService.transfer(fromUser, toUser, amount);
    }

    @GetMapping("/{userId}/transactions")
    public List<Transaction> getTransactionHistory(@PathVariable int userId) throws SQLException {
        User user = userService.findById(userId);
        return user != null ? accountService.getTransactionHistory(user) : null;
    }
}