package com.cashmachine.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cashmachine.api.model.AccountLevel;

@Repository
public interface AccountLevelRepository extends JpaRepository<AccountLevel, Integer> { }
