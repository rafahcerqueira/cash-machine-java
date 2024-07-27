package com.cashmachine.api.model;

import javax.persistence.*;

@Entity
@Table(name = "account_levels")
public class AccountLevel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String level;

    // Construtor padrão
    public AccountLevel() {
    }

    // Construtor com parâmetro
    public AccountLevel(String level) {
        this.level = level;
    }

    // Getters e Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }
}
