package com.cashmachine.api.configs;

/**
 * Class containing bank settings
 */
public class DBConfig {
    
    /**
	 * Database Host
	 */
    public static String host = "localhost";

    /**
	 * Database User
	 */
    public static String user = "root";

    /**
	 * Database Password
	 */
    public static String password = "";

    /**
	 * Database Name
	 */
    public static String database = "CASH_MACHINE";

    /**
	 * Database Port
	 */
    public static int port = 3306;

    /**
	 * Database Url
	 */
    public static String url = "jdbc:mysql://" + host + ":" + port + "/" + database;

    /**
     * Constructor
     */
    private DBConfig() {  }

}
