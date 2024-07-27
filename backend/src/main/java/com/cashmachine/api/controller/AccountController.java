package com.cashmachine.api.controller;

import com.cashmachine.api.model.User;
import com.cashmachine.api.model.Transaction;
import com.cashmachine.api.service.AccountService;
import com.cashmachine.api.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

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
    public ResponseEntity<String> deposit(@PathVariable int userId, @RequestParam double amount) {
        Optional<User> userOpt = userService.findById(userId);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        boolean success = accountService.deposit(userOpt.get(), BigDecimal.valueOf(amount));
        return success ? ResponseEntity.ok("Deposit successful") : ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Deposit failed");
    }

    @PostMapping("/{userId}/withdraw")
    public ResponseEntity<String> withdraw(@PathVariable int userId, @RequestParam double amount) {
        Optional<User> userOpt = userService.findById(userId);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        boolean success = accountService.withdraw(userOpt.get(), BigDecimal.valueOf(amount));
        return success ? ResponseEntity.ok("Withdrawal successful") : ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Withdrawal failed");
    }

    @PostMapping("/transfer")
    public ResponseEntity<String> transfer(@RequestParam int fromUserId, @RequestParam int toUserId, @RequestParam double amount) {
        Optional<User> fromUserOpt = userService.findById(fromUserId);
        Optional<User> toUserOpt = userService.findById(toUserId);

        if (fromUserOpt.isEmpty() || toUserOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User(s) not found");
        }

        boolean success = accountService.transfer(fromUserOpt.get(), toUserOpt.get(), BigDecimal.valueOf(amount));
        return success ? ResponseEntity.ok("Transfer successful") : ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Transfer failed");
    }

    @GetMapping("/{userId}/transactions")
    public ResponseEntity<List<Transaction>> getTransactionHistory(@PathVariable int userId) {
        Optional<User> userOpt = userService.findById(userId);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        List<Transaction> transactions = accountService.getTransactionHistory(userOpt.get());
        return ResponseEntity.ok(transactions);
    }

    @GetMapping("/teste")
    public ResponseEntity<String> testeEndpoint() {
        return ResponseEntity.ok("Test response");
    }
}
