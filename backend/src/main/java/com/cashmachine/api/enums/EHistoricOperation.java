package com.cashmachine.api.enums;

/**
 * Historic Operation Enum
 */
public enum EHistoricOperation {
    /**
     * Withdraw Historic
     */
    Withdraw("S"),

    /**
     * Deposit Historic
     */
    Deposit("D"),

    /**
     * Transfer Historic
     */
    Transfer("T");

    /**
     * Enum type description 
     */
    private String description;

    /**
     * Constructor
     * @param description
     */
    private EHistoricOperation(String description) {
        this.description = description;
    }

    /**
     * Get description
    */
    public String getDescription () {
        return description;
    }
}