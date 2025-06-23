package com.example.backend;

import com.example.backend.service.MainApiService.MainApiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.IOException;

@SpringBootApplication
@EnableScheduling
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}
}

@Component
class ScheduledTask {

	private final MainApiService mainApiService;

	@Autowired
	public ScheduledTask(MainApiService mainApiService) {
		this.mainApiService = mainApiService;
	}

	@Scheduled(fixedDelay = 8000) // Run every 8 seconds
	public void executeTask() throws IOException {
		System.out.println("hi");
		mainApiService.goWork();
	}
}
