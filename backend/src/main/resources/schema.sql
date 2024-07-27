-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS cash_machine;
USE cash_machine;

-- Tabela para tipos de conta
CREATE TABLE IF NOT EXISTS account_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(50) NOT NULL -- Exemplos: "Poupança", "Corrente"
);

-- Tabela para níveis de conta
CREATE TABLE IF NOT EXISTS account_levels (
    id INT AUTO_INCREMENT PRIMARY KEY,
    level VARCHAR(50) NOT NULL -- Exemplos: "Prata", "Bronze", "Ouro"
);

-- Tabela para usuários
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    account_type_id INT NOT NULL,
    account_level_id INT NOT NULL,
    balance DECIMAL(10, 2) NOT NULL,
    password VARCHAR(255) NOT NULL,
    FOREIGN KEY (account_type_id) REFERENCES account_types(id),
    FOREIGN KEY (account_level_id) REFERENCES account_levels(id)
);

-- Tabela para slots de notas
CREATE TABLE IF NOT EXISTS note_slots (
    id INT AUTO_INCREMENT PRIMARY KEY,
    denomination INT NOT NULL, -- Valores como 2, 5, 10, 20, 50, 100, 200
    quantity INT NOT NULL
);

-- Tabela para transações
CREATE TABLE IF NOT EXISTS transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    type VARCHAR(50) NOT NULL, -- Exemplos: "Depósito", "Saque", "Transferência"
    amount DECIMAL(10, 2) NOT NULL,
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Inserir tipos de conta
INSERT INTO account_types (type) VALUES ('Poupança');
INSERT INTO account_types (type) VALUES ('Corrente');

-- Inserir níveis de conta
INSERT INTO account_levels (level) VALUES ('Prata');
INSERT INTO account_levels (level) VALUES ('Bronze');
INSERT INTO account_levels (level) VALUES ('Ouro');

-- Inserir slots de notas com valores iniciais
INSERT INTO note_slots (denomination, quantity) VALUES (2, 10);   -- 10 notas de 2 reais
INSERT INTO note_slots (denomination, quantity) VALUES (5, 10);   -- 10 notas de 5 reais
INSERT INTO note_slots (denomination, quantity) VALUES (10, 10);  -- 10 notas de 10 reais
INSERT INTO note_slots (denomination, quantity) VALUES (20, 10);  -- 10 notas de 20 reais
INSERT INTO note_slots (denomination, quantity) VALUES (50, 10);  -- 10 notas de 50 reais
INSERT INTO note_slots (denomination, quantity) VALUES (100, 10); -- 10 notas de 100 reais
INSERT INTO note_slots (denomination, quantity) VALUES (200, 10); -- 10 notas de 200 reais