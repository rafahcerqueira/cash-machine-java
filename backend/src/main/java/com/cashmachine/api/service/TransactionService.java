package com.cashmachine.api.service;

import com.cashmachine.api.model.Transaction;

import java.util.List;

public interface TransactionService {

    void saveTransaction(Transaction transaction);

    List<Transaction> getTransactionsByUserId(long userId);
}
