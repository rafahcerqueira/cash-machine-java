package cashmachine.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import cashmachine.api.model.Transaction;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction,Long> {
    List<Transaction> findByUserId(Long userId);
}
