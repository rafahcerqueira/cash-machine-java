package com.cashmachine.api.service;

import com.cashmachine.api.model.Transaction;
import com.cashmachine.api.model.User;
import com.cashmachine.api.repository.TransactionRepository;
import com.cashmachine.api.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AccountService {

    private final UserRepository userRepository;
    private final TransactionRepository transactionRepository;
    private final Map<Integer, Integer> cashSlots;

    public AccountService(UserRepository userRepository, TransactionRepository transactionRepository) {
        this.userRepository = userRepository;
        this.transactionRepository = transactionRepository;
        this.cashSlots = new HashMap<>();
        initializeSlots();
    }

    private void initializeSlots() {
        cashSlots.put(2, 10);    // 10 notas de 2
        cashSlots.put(5, 10);    // 10 notas de 5
        cashSlots.put(10, 10);   // 10 notas de 10
        cashSlots.put(20, 10);   // 10 notas de 20
        cashSlots.put(50, 10);   // 10 notas de 50
        cashSlots.put(100, 10);  // 10 notas de 100
        cashSlots.put(200, 10);  // 10 notas de 200
    }

    public boolean deposit(User user, BigDecimal amount) {
        if (amount.compareTo(BigDecimal.ZERO) <= 0) return false;

        user.setBalance(user.getBalance().add(amount));
        userRepository.save(user);

        Transaction transaction = new Transaction(user.getId(), "DEPOSIT", amount, LocalDateTime.now());
        transactionRepository.save(transaction);

        return true;
    }

    public boolean withdraw(User user, BigDecimal amount) {
        if (amount.compareTo(BigDecimal.ZERO) <= 0 || amount.compareTo(user.getBalance()) > 0 || !isWithdrawable(amount)) {
            return false;
        }

        if (!dispenseCash(amount)) {
            return false;
        }

        user.setBalance(user.getBalance().subtract(amount));
        userRepository.save(user);

        Transaction transaction = new Transaction(user.getId(), "WITHDRAW", amount, LocalDateTime.now());
        transactionRepository.save(transaction);

        return true;
    }

    private boolean isWithdrawable(BigDecimal amount) {
        int[] notes = {200, 100, 50, 20, 10, 5, 2};
        for (int note : notes) {
            while (amount.compareTo(BigDecimal.valueOf(note)) >= 0 && cashSlots.get(note) > 0) {
                amount = amount.subtract(BigDecimal.valueOf(note));
                cashSlots.put(note, cashSlots.get(note) - 1);
            }
        }
        return amount.compareTo(BigDecimal.ZERO) == 0;
    }

    private boolean dispenseCash(BigDecimal amount) {
        int[] notes = {200, 100, 50, 20, 10, 5, 2};
        Map<Integer, Integer> tempSlots = new HashMap<>(cashSlots);

        for (int note : notes) {
            while (amount.compareTo(BigDecimal.valueOf(note)) >= 0 && tempSlots.get(note) > 0) {
                amount = amount.subtract(BigDecimal.valueOf(note));
                tempSlots.put(note, tempSlots.get(note) - 1);
            }
        }

        if (amount.compareTo(BigDecimal.ZERO) == 0) {
            cashSlots.clear();
            cashSlots.putAll(tempSlots);
            return true;
        }

        return false;
    }

    public boolean transfer(User fromUser, User toUser, BigDecimal amount) {
        if (amount.compareTo(BigDecimal.ZERO) <= 0 || amount.compareTo(fromUser.getBalance()) > 0) {
            return false;
        }

        fromUser.setBalance(fromUser.getBalance().subtract(amount));
        toUser.setBalance(toUser.getBalance().add(amount));

        userRepository.save(fromUser);
        userRepository.save(toUser);

        Transaction fromTransaction = new Transaction(fromUser.getId(), "TRANSFER OUT", amount, LocalDateTime.now());
        Transaction toTransaction = new Transaction(toUser.getId(), "TRANSFER IN", amount, LocalDateTime.now());
        transactionRepository.save(fromTransaction);
        transactionRepository.save(toTransaction);

        return true;
    }

    public List<Transaction> getTransactionHistory(User user) {
        return transactionRepository.findByUserId(user.getId());
    }
}
