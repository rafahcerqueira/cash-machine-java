package com.cashmachine.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cashmachine.api.model.AccountLevel;

public interface AccountLevelRepository extends JpaRepository<AccountLevel, Integer> { }
