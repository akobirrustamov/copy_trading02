package com.example.backend.service.BotTradersService;


import com.example.backend.dto.BotTradesDto;
import org.springframework.http.HttpEntity;

public interface BotTradersService {

    HttpEntity<?> addTrader(BotTradesDto tradesDto);

    HttpEntity<?> deleteTrader(String adminId);

    HttpEntity<?> getTraders();
}
