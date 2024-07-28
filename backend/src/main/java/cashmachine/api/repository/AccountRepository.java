package cashmachine.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import cashmachine.api.model.Account;


public interface AccountRepository extends JpaRepository<Account,Long> { }
