package com.cashmachine.api.cash_machine_api;

import com.cashmachine.api.routers.RAccount;
import com.cashmachine.api.routers.RCard;
import com.cashmachine.api.routers.RCashMachine;
import com.cashmachine.api.routers.RClient;
import com.cashmachine.api.routers.RClientTelephone;
import com.cashmachine.api.routers.RCreateFullAccount;
import com.cashmachine.api.routers.RLogin;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackageClasses = RClient.class)
@ComponentScan(basePackageClasses = RClientTelephone.class)
@ComponentScan(basePackageClasses = RCreateFullAccount.class)
@ComponentScan(basePackageClasses = RLogin.class)
@ComponentScan(basePackageClasses = RCard.class)
@ComponentScan(basePackageClasses = RCashMachine.class)
@ComponentScan(basePackageClasses = RAccount.class)
public class CashMachineApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(CashMachineApiApplication.class, args);
	}

}
