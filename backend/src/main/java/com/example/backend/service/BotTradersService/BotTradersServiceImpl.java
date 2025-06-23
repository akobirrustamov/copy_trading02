package com.example.backend.service.BotTradersService;


import com.example.backend.dto.BotTradesDto;
import com.example.backend.entity.BotSubscribe;
import com.example.backend.entity.BotTraders;
import com.example.backend.repository.BotSubscribeRepository;
import com.example.backend.repository.BotTradersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BotTradersServiceImpl implements BotTradersService {
    private final BotTradersRepository botTradersRepository;
    private final BotSubscribeRepository botSubscribeRepository;

    @Override
    public HttpEntity<?> addTrader(BotTradesDto tradesDto) {
        if (tradesDto.getTradername().equals("") || tradesDto.getUid().equals("")){
            return ResponseEntity.ok("Error");
        }
        botTradersRepository.save(new BotTraders(tradesDto.getUid(), tradesDto.getTradername(),"", 0, tradesDto.getTrader_status()));
        return ResponseEntity.ok("Saved successfully");
    }

    @Override
    public HttpEntity<?> deleteTrader(String adminId) {
        List<BotSubscribe> allByTraderId = botSubscribeRepository.findAllByTraderId(adminId);
        botSubscribeRepository.deleteAll(allByTraderId);
        botTradersRepository.deleteById(adminId);
        return ResponseEntity.ok("Admin deleted successfully!");
    }


    @Override
    public HttpEntity<?> getTraders() {
        return ResponseEntity.ok(botTradersRepository.findAll());
    }
}