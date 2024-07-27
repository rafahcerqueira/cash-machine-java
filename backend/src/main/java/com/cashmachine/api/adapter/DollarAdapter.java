package com.cashmachine.api.adapter;

public class DollarAdapter {
    private static final double DOLLAR_TO_REAL = 5.0;  // Exemplo de taxa de conversão

    public double convertToReais(double dollars) {
        return dollars * DOLLAR_TO_REAL;
    }
}
