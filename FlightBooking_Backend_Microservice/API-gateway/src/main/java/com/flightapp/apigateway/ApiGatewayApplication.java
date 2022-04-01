package com.flightapp.apigateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
public class ApiGatewayApplication {

	public static void main(String[] args) {

		System.out.println("her");
		SpringApplication.run(ApiGatewayApplication.class, args);
	}

}
