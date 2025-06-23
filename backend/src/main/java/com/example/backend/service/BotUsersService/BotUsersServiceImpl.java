package com.example.backend.service.BotUsersService;


import com.example.backend.dto.BotUserDto;
import com.example.backend.dto.TradersForUserDto;
import com.example.backend.entity.BotSubscribe;
import com.example.backend.entity.BotTraders;
import com.example.backend.entity.BotUsers;
import com.example.backend.repository.BotSubscribeRepository;
import com.example.backend.repository.BotTradersRepository;
import com.example.backend.repository.BotUsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BotUsersServiceImpl implements BotUsersService {
    private final BotUsersRepository botUsersRepository;
    private final BotTradersRepository botTradersRepository;
    private final BotSubscribeRepository botSubscribe;
    @Override
    public HttpEntity<?> getUsers(String search) {;
        List<BotUserDto> all = botUsersRepository.findBotUsersBySearch(search);
        return ResponseEntity.ok(all);
    }

    @Override
    public HttpEntity<?> changeStatus(BigInteger id) {
        BotUsers byId = botUsersRepository.findById(id).orElseThrow();
        if(byId.getStatus().equals("noallowed")){
            byId.setStatus("off");
        }else {
            byId.setStatus("noallowed");
        }
        botUsersRepository.save(byId);
        return ResponseEntity.ok("Status changed successfully");
    }

    @Override
    public HttpEntity<?> getMe(BigInteger id) {
        return ResponseEntity.ok(botUsersRepository.findById(id));
    }

//    @Override
//    public HttpEntity<?> getTraders(BigInteger id) {
//        List<TradersForUserDto> result = botTradersRepository.getTradersForUser(id);
//        return ResponseEntity.ok(result);
//    }


    @Override
    public HttpEntity<?> getTraders(BigInteger id) {
        List<BotTraders> allTraders = botTradersRepository.findAll();
        List<TradersForUserDto> result = new ArrayList<>();
        List<BotSubscribe> subscriptions = botSubscribe.findAllByTelegramId(id);
        for (BotTraders trader : allTraders) {
            boolean isActive = findActive(trader.getUid(), subscriptions);
            TradersForUserDto tradersForUserDto = new TradersForUserDto("21"+trader.getUid()+"D3",trader.getTradername(),  trader.getPnl_trade(), isActive, trader.getTrader_status());
            result.add(tradersForUserDto);
        }
        return ResponseEntity.ok(result);
    }
    private boolean findActive(String traderUid, List<BotSubscribe> subscriptions) {
        for (BotSubscribe subscription : subscriptions) {
            if (subscription.getTraderuid().equals(traderUid)) {
                return true;
            }
        }
        return false; // User is not subscribed to this trader
    }

    @Override
    public HttpEntity<?> setSubscriber(BigInteger id, String uid) {
        String trader=uid.substring(2);
        trader=trader.substring(0,trader.length()-2);
        List<BotSubscribe> allByTelegramIdAndUser = botSubscribe.findAllByTelegramIdAndUser(id, trader);
        if(allByTelegramIdAndUser.size()==0){
            BotSubscribe botSubscribe1= new BotSubscribe(id, trader);
            botSubscribe.save(botSubscribe1);
        }else {
            botSubscribe.deleteById(allByTelegramIdAndUser.get(0).getId());
        }
        return ResponseEntity.ok("Saved successfully!");
    }

    @Override
    public HttpEntity<?> setting(BotUsers botUser) {
        botUsersRepository.save(botUser);
        return null;
    }



}