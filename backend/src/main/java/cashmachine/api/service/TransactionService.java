package cashmachine.api.service;

import java.util.List;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import lombok.AllArgsConstructor;
import cashmachine.api.model.Account;
import cashmachine.api.model.Transaction;
import cashmachine.api.model.User;
import cashmachine.api.repository.AccountRepository;
import cashmachine.api.repository.TransactionRepository;
import cashmachine.api.repository.UserRepository;
import cashmachine.api.exception.MyRuntimeException;

@Service
@AllArgsConstructor
public class TransactionService {
    private final TransactionRepository transactionRepository;
    private final AccountRepository accountRepository;
    private final UserRepository userRepository;

    @Transactional
    public void deposit(Long userId, BigDecimal amount) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new MyRuntimeException("User not found"));

        Account account = user.getAccount();
        account.setBalance(account.getBalance().add(amount));
        accountRepository.save(account);

        Transaction transaction = new Transaction(userId, "DEPOSIT", amount, LocalDateTime.now());
        transactionRepository.save(transaction);
    }

    @Transactional
    public void withdraw(Long userId, BigDecimal amount) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new MyRuntimeException("User not found"));

        Account account = user.getAccount();
        if (account.getBalance().compareTo(amount) < 0) {
            throw new MyRuntimeException("Insufficient balance");
        }

        account.setBalance(account.getBalance().subtract(amount));
        accountRepository.save(account);

        Transaction transaction = new Transaction(userId, "WITHDRAW", amount, LocalDateTime.now());
        transactionRepository.save(transaction);
    }

    @Transactional
    public void transfer(Long sourceUserId, Long targetUserId, BigDecimal amount) {
        User sourceUser = userRepository.findById(sourceUserId)
                .orElseThrow(() -> new MyRuntimeException("Source user not found"));

        User targetUser = userRepository.findById(targetUserId)
                .orElseThrow(() -> new MyRuntimeException("Target user not found"));

        Account sourceAccount = sourceUser.getAccount();
        Account targetAccount = targetUser.getAccount();

        if (sourceAccount.getBalance().compareTo(amount) < 0) {
            throw new MyRuntimeException("Insufficient balance");
        }

        sourceAccount.setBalance(sourceAccount.getBalance().subtract(amount));
        targetAccount.setBalance(targetAccount.getBalance().add(amount));

        accountRepository.save(sourceAccount);
        accountRepository.save(targetAccount);

        Transaction transaction = new Transaction(sourceUserId, "TRANSFER", amount, LocalDateTime.now());
        transactionRepository.save(transaction);

        // Criando um registro de transação separado para o destinatário (opcional)
        Transaction transactionForRecipient = new Transaction(targetUserId, "RECEIVE_TRANSFER", amount, LocalDateTime.now());
        transactionRepository.save(transactionForRecipient);
    }

    @Transactional(readOnly = true)
    public List<Transaction> getTransactions(Long userId) {
        return transactionRepository.findByUserId(userId);
    }
}
