package com.example.backend.service.ShowMessageRepository;


import com.example.backend.repository.ShowMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.math.BigInteger;

@Service
@RequiredArgsConstructor
public class ShowMessageImpl implements ShowMessageService {
    private final ShowMessageRepository messageRepository;

    @Override
    public HttpEntity<?> getMessage(BigInteger telegramid) {
        System.out.println(telegramid);
        return ResponseEntity.ok(messageRepository.findAllByTelegramId(telegramid ));
    }
}