package com.cashmachine.api.configs;

// Database Settings
public class DBConfig {
    
    public static String host = "localhost";
    public static String user = "root";
    public static String password = "admin";
    public static String database = "CASH_MACHINE";
    public static int port = 3306;
    public static String url = "jdbc:mysql://" + host + ":" + port + "/" + database;

    private DBConfig() {  }
}