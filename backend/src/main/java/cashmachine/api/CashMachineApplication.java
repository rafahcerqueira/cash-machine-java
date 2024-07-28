package cashmachine.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import cashmachine.api.config.AppConfig;
import cashmachine.api.config.RsaKeyProperties;

@SpringBootApplication
@EnableConfigurationProperties({AppConfig.class, RsaKeyProperties.class})
public class CashMachineApplication {

	public static void main(String[] args) {
		SpringApplication.run(CashMachineApplication.class, args);
	}

}
