package com.cashmachine.api.model;

import javax.persistence.*;

@Entity
@Table(name = "account_types")
public class AccountType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String type;

    // Construtor padrão
    public AccountType() {
    }

    // Construtor com parâmetro
    public AccountType(String type) {
        this.type = type;
    }

    // Getters e Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
