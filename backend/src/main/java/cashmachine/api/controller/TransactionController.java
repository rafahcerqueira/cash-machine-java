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
import cashmachine.api.exception.MyRuntimeException;

@RestController
@RequestMapping("/api/transactions")
@AllArgsConstructor
public class TransactionController {
    private final TransactionService transactionService;

    @PostMapping("/deposit")
    public ResponseEntity<String> deposit(@RequestBody DepositRequest depositRequest) {
        try {
            transactionService.deposit(depositRequest.getUserId(), depositRequest.getAmount(), depositRequest.getNotes(), depositRequest.getIsDollar());
            return new ResponseEntity<>("Deposit succesfull", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>( e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/withdraw")
    public ResponseEntity<String> withdraw(@RequestBody WithdrawRequest withdrawRequest) {
        try {
            transactionService.withdraw(withdrawRequest.getUserId(), withdrawRequest.getAmount(), withdrawRequest.getNotes(), withdrawRequest.getIsDollar());
            return new ResponseEntity<>("Withdraw succesfull", HttpStatus.OK);
        } catch (MyRuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/transfer")
    public ResponseEntity<String> transfer(@RequestBody TransferRequest transferRequest) {
        try {
            transactionService.transfer(transferRequest.getSourceUserId(), transferRequest.getTargetUserId(), transferRequest.getAmount());
            return new ResponseEntity<>("Transfer succesfull", HttpStatus.OK);
        } catch (MyRuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Transaction>> getTransactions(@PathVariable Long userId) {
        try {
            List<Transaction> transactions = transactionService.getTransactions(userId);
            return new ResponseEntity<>(transactions, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}