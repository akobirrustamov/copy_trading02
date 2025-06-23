package com.example.backend.controller;

import com.example.backend.repository.BotTradersRepository;
import com.example.backend.service.MainApiService.MainApiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/ordertraders")
public class MainFunction {
    private final BotTradersRepository botTradersRepository;
    @GetMapping
    public HttpEntity<?> getOrders() {
        System.out.println("ko");
        return ResponseEntity.ok(botTradersRepository.findAll());
    }



}
