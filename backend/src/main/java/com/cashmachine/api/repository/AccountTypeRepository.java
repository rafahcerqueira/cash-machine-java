package com.cashmachine.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cashmachine.api.model.AccountType;

public interface AccountTypeRepository extends JpaRepository<AccountType, Integer> { }
