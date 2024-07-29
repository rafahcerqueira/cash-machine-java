package cashmachine.api.controller;

import lombok.AllArgsConstructor;
import cashmachine.api.model.Transaction;
import cashmachine.api.service.TransactionService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@AllArgsConstructor
public class TransactionController {
    private final TransactionService transactionService;

    @PostMapping("/deposit")
    public ResponseEntity<Void> deposit(@RequestParam Long userId, @RequestParam BigDecimal amount) {
        transactionService.deposit(userId, amount);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/withdraw")
    public ResponseEntity<Void> withdraw(@RequestParam Long userId, @RequestParam BigDecimal amount) {
        transactionService.withdraw(userId, amount);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/transfer")
    public ResponseEntity<Void> transfer(@RequestParam Long sourceUserId, @RequestParam Long targetUserId, @RequestParam BigDecimal amount) {
        transactionService.transfer(sourceUserId, targetUserId, amount);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Transaction>> getTransactions(@PathVariable Long userId) {
        List<Transaction> transactions = transactionService.getTransactions(userId);
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }
}
