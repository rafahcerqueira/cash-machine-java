package com.cashmachine.api.model;

public class Transaction {
    private int id;
    private int userId;
    private String type;
    private double amount;
    private String date;

    public Transaction(int id, int userId, String type, double amount, String date) {
        this.id = id;
        this.userId = userId;
        this.type = type;
        this.amount = amount;
        this.date = date;
    }

    public Transaction(int userId, String type, double amount, String date) {
        this(0, userId, type, amount, date);
    }

    public int getId() {
        return id;
    }

    public int getUserId() {
        return userId;
    }

    public String getType() {
        return type;
    }

    public double getAmount() {
        return amount;
    }

    public String getDate() {
        return date;
    }
}
