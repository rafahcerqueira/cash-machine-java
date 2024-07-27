package com.cashmachine.api.model;

import com.cashmachine.api.observer.AccountObservable;

import javax.persistence.*;

@Entity
@Table(name = "accounts")
public abstract class Account extends AccountObservable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String type;

    @Column(nullable = false)
    private String level;

    @Column(nullable = false)
    private double balance;

    // Construtores
    public Account() {
    }

    public Account(String type, String level, double balance) {
        this.type = type;
        this.level = level;
        this.balance = balance;
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
        notifyObservers("Balance updated to: " + balance);
    }
}
