package com.example.backend.controller;

import com.example.backend.dto.BotTradesDto;
import com.example.backend.entity.BotAdmins;
import com.example.backend.service.BotAdminsService.BotAdminsService;
import com.example.backend.service.BotTradersService.BotTradersService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/traders")
public class BotTradersController {
    private final BotTradersService botTradersService;
    @PostMapping
    public HttpEntity<?> addTrader(@RequestBody BotTradesDto tradesDto) {
        System.out.println(tradesDto);
        return botTradersService.addTrader(tradesDto);
    }

    @GetMapping
    public HttpEntity<?> getTraders(){
        return botTradersService.getTraders();
    }

    @DeleteMapping("/{adminId}")
    public HttpEntity<?> deleteTrader(@PathVariable String adminId) {
//        System.out.println(adminId);
        return botTradersService.deleteTrader(adminId);
    }
}
