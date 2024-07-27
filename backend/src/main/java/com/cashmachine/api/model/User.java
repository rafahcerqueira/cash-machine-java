package com.cashmachine.api.model;

public class User {
    private int id;
    private String name;
    private String accountType;
    private String accountLevel;
    private double balance;
    private String password;

    public User(int id, String name, String accountType, String accountLevel, double balance, String password) {
        this.id = id;
        this.name = name;
        this.accountType = accountType;
        this.accountLevel = accountLevel;
        this.balance = balance;
        this.password = password;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getAccountType() {
        return accountType;
    }

    public String getAccountLevel() {
        return accountLevel;
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
