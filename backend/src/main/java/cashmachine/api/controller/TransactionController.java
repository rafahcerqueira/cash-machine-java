package cashmachine.api.controller;

import java.util.List;
import lombok.AllArgsConstructor;
import cashmachine.api.model.Transaction;
import cashmachine.api.dto.DepositRequest;
import cashmachine.api.dto.TransferRequest;
import cashmachine.api.dto.WithdrawRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import cashmachine.api.service.TransactionService;

@RestController
@RequestMapping("/api/transactions")
@AllArgsConstructor
public class TransactionController {
    private final TransactionService transactionService;

    @PostMapping("/deposit")
    public ResponseEntity<Void> deposit(@RequestBody DepositRequest depositRequest) {
        transactionService.deposit(depositRequest.getUserId(), depositRequest.getAmount());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/withdraw")
    public ResponseEntity<Void> withdraw(@RequestBody WithdrawRequest withdrawRequest) {
        transactionService.withdraw(withdrawRequest.getUserId(), withdrawRequest.getAmount());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/transfer")
    public ResponseEntity<Void> transfer(@RequestBody TransferRequest transferRequest) {
        transactionService.transfer(transferRequest.getSourceUserId(), transferRequest.getTargetUserId(), transferRequest.getAmount());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Transaction>> getTransactions(@PathVariable Long userId) {
        List<Transaction> transactions = transactionService.getTransactions(userId);
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }
}
