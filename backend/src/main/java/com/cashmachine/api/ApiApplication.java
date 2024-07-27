package com.cashmachine.api;

import com.cashmachine.api.model.User;
import com.cashmachine.api.model.Account;
import com.cashmachine.api.model.AccountLevel;
import com.cashmachine.api.model.AccountType;
import com.cashmachine.api.model.NoteSlot;
import com.cashmachine.api.model.Transaction;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class ApiApplication {
    public static void main(String[] args) {
        SpringApplication.run(ApiApplication.class, args);
    }
}