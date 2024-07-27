package com.cashmachine.api.model;

import javax.persistence.*;

@Entity
@Table(name = "note_slots")
public class NoteSlot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int value;
    private int quantity;

    // Construtores
    public NoteSlot() {}

    public NoteSlot(int value, int quantity) {
        this.value = value;
        this.quantity = quantity;
    }

    // Getters e Setters
    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
