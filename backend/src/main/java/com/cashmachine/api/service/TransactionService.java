package com.cashmachine.api.service;

import com.cashmachine.api.model.Transaction;

import java.util.List;
import org.springframework.stereotype.Component;

@Component
public interface TransactionService {

    void saveTransaction(Transaction transaction);

    List<Transaction> getTransactionsByUserId(long userId);
}
