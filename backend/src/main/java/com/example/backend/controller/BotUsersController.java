package com.example.backend.controller;

import com.example.backend.entity.BotUsers;
import com.example.backend.service.BotUsersService.BotUsersService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/userjon")
public class BotUsersController {
    private final BotUsersService botUsersService;
    @GetMapping
    public HttpEntity<?> getUsers(@RequestParam(defaultValue = "") String search) {
        return botUsersService.getUsers(search);
    }

    @PutMapping
    public HttpEntity<?> changeStatus(@RequestParam BigInteger id) {
        return botUsersService.changeStatus(id);
    }

    @GetMapping("/me")
    public HttpEntity<?> getMe(@RequestParam BigInteger id) {
        return botUsersService.getMe(id);
    }
    @GetMapping("/traders")
    public HttpEntity<?> getTraders(@RequestParam BigInteger id) {
        return botUsersService.getTraders(id);
    }
    @PutMapping("/traders")
    public HttpEntity<?> setSubscriber(@RequestParam BigInteger id, @RequestParam String uid) {
        return botUsersService.setSubscriber(id, uid);
    }

    @PutMapping("/setting")
    public HttpEntity<?> setting(@RequestBody BotUsers botUser){
        return botUsersService.setting(botUser);
    }

}
