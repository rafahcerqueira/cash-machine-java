package com.cashmachine.api.model;

public abstract class Account {
    private String type;
    private String level;
    private double balance;

    public Account(String type, String level, double balance) {
        this.type = type;
        this.level = level;
        this.balance = balance;
    }

    public String getType() {
        return type;
    }

    public String getLevel() {
        return level;
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }
}
