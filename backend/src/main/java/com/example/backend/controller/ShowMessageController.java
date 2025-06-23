package com.example.backend.controller;

import com.example.backend.service.ShowMessageRepository.ShowMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigInteger;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/message")
public class ShowMessageController {
    private final ShowMessageService showMessageService;
    @GetMapping
    public HttpEntity<?> getMessage(@RequestParam BigInteger id){
        System.out.println("sasa");
        return showMessageService.getMessage(id);
    }
}
