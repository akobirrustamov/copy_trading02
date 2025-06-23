package com.example.backend.controller;

import com.example.backend.entity.ShowMessage;
import com.example.backend.repository.BotTradersRepository;
import com.example.backend.repository.ShowMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/notification")
public class NotificationController {
    private final ShowMessageRepository showMessageRepository;
    @PostMapping
    public HttpEntity<?> getOrders(@RequestBody ShowMessage message) {
       showMessageRepository.save(message);
       return ResponseEntity.ok("ok");
    }
}
