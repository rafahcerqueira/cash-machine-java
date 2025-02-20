package cashmachine.api.facade;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import cashmachine.api.model.Transaction;
import cashmachine.api.service.TransactionService;

@Service
@AllArgsConstructor
public class TransactionFacade {
    private final TransactionService transactionService;

    public void deposit(Long userId, BigDecimal amount, Map<Integer, Integer> requestedNotes, boolean isDollar) {
        transactionService.deposit(userId, amount, requestedNotes, isDollar);
    }

    public void withdraw(Long userId, BigDecimal amount, Map<Integer, Integer> requestedNotes) {
        transactionService.withdraw(userId, amount, requestedNotes);
    }

    public void transfer(String accountNumberOrigin, String accountNumberRecipient, BigDecimal amount) {
        transactionService.transfer(accountNumberOrigin, accountNumberRecipient, amount);
    }

    public List<Transaction> getTransactions(Long userId) {
        return transactionService.getTransactions(userId);
    }
}
