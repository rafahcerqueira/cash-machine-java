-- Create Database
CREATE DATABASE ATMSystemDB;

-- Use Database
USE ATMSystemDB;

-- Table for Users
CREATE TABLE User (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    type ENUM('Gold', 'Silver', 'Bronze') NOT NULL
);

-- Table for Accounts
CREATE TABLE Account (
    id INT AUTO_INCREMENT PRIMARY KEY,
    accountNumber VARCHAR(20) NOT NULL UNIQUE,
    balance DECIMAL(15, 2) NOT NULL,
    type ENUM('Savings', 'Checking') NOT NULL,
    userId INT,
    FOREIGN KEY (userId) REFERENCES User(id)
);

-- Table for Transactions
CREATE TABLE Transaction (
    id INT AUTO_INCREMENT PRIMARY KEY,
    accountId INT,
    type ENUM('Deposit', 'Withdraw', 'Transfer') NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    transactionDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    targetAccountId INT,
    FOREIGN KEY (accountId) REFERENCES Account(id),
    FOREIGN KEY (targetAccountId) REFERENCES Account(id)
);