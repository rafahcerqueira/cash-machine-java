package com.cashmachine.api.service;

import com.cashmachine.api.model.Transaction;
import com.cashmachine.api.model.User;
import com.cashmachine.api.repository.AccountRepository;
import com.cashmachine.api.repository.UserRepository;

import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class AccountService {
    private UserRepository userRepository;
    private AccountRepository accountRepository;
    private Map<Integer, Integer> cashSlots;

    public AccountService(UserRepository userRepository, AccountRepository accountRepository) {
        this.userRepository = userRepository;
        this.accountRepository = accountRepository;
        this.cashSlots = new HashMap<>();
        initializeSlots();
    }

    private void initializeSlots() {
        cashSlots.put(2, 10);    // 10 notes of 2
        cashSlots.put(5, 10);    // 10 notes of 5
        cashSlots.put(10, 10);   // 10 notes of 10
        cashSlots.put(20, 10);   // 10 notes of 20
        cashSlots.put(50, 10);   // 10 notes of 50
        cashSlots.put(100, 10);  // 10 notes of 100
        cashSlots.put(200, 10);  // 10 notes of 200
    }

    public boolean deposit(User user, double amount) throws SQLException {
        if (amount <= 0) return false;

        user.setBalance(user.getBalance() + amount);
        userRepository.save(user);

        Transaction transaction = new Transaction(user.getId(), "DEPOSIT", amount, LocalDateTime.now().toString());
        accountRepository.saveTransaction(transaction);

        return true;
    }

    public boolean withdraw(User user, double amount) throws SQLException {
        if (amount <= 0 || amount > user.getBalance() || !isWithdrawable(amount)) {
            return false;
        }

        if (!dispenseCash(amount)) {
            return false;
        }

        user.setBalance(user.getBalance() - amount);
        userRepository.save(user);

        Transaction transaction = new Transaction(user.getId(), "WITHDRAW", amount, LocalDateTime.now().toString());
        accountRepository.saveTransaction(transaction);

        return true;
    }

    private boolean isWithdrawable(double amount) {
        int[] notes = {200, 100, 50, 20, 10, 5, 2};
        for (int note : notes) {
            while (amount >= note && cashSlots.get(note) > 0) {
                amount -= note;
                cashSlots.put(note, cashSlots.get(note) - 1);
            }
        }
        return amount == 0;
    }

    private boolean dispenseCash(double amount) {
        int[] notes = {200, 100, 50, 20, 10, 5, 2};
        Map<Integer, Integer> tempSlots = new HashMap<>(cashSlots);

        for (int note : notes) {
            while (amount >= note && tempSlots.get(note) > 0) {
                amount -= note;
                tempSlots.put(note, tempSlots.get(note) - 1);
            }
        }

        if (amount == 0) {
            cashSlots = tempSlots;
            return true;
        }

        return false;
    }

    public boolean transfer(User fromUser, User toUser, double amount) throws SQLException {
        if (amount <= 0 || amount > fromUser.getBalance()) {
            return false;
        }

        fromUser.setBalance(fromUser.getBalance() - amount);
        toUser.setBalance(toUser.getBalance() + amount);

        userRepository.save(fromUser);
        userRepository.save(toUser);

        Transaction fromTransaction = new Transaction(fromUser.getId(), "TRANSFER OUT", amount, LocalDateTime.now().toString());
        Transaction toTransaction = new Transaction(toUser.getId(), "TRANSFER IN", amount, LocalDateTime.now().toString());
        accountRepository.saveTransaction(fromTransaction);
        accountRepository.saveTransaction(toTransaction);

        return true;
    }

    public List<Transaction> getTransactionHistory(User user) throws SQLException {
        return accountRepository.findTransactionsByUserId(user.getId());
    }
}
