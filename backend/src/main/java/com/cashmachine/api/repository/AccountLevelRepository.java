package com.cashmachine.api.repository;

import com.cashmachine.api.model.AccountLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountLevelRepository extends JpaRepository<AccountLevel, Integer> { }
