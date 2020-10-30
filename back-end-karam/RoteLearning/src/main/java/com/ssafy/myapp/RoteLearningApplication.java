package com.ssafy.myapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class RoteLearningApplication {

	public static void main(String[] args) {
		SpringApplication app = new SpringApplication(RoteLearningApplication.class);
		app.run(args);
	}

}
