package com.cashmachine.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cashmachine.api.model.AccountType;

@Repository
public interface AccountTypeRepository extends JpaRepository<AccountType, Integer> { }
