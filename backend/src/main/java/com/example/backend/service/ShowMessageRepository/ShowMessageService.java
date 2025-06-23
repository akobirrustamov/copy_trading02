package com.example.backend.service.ShowMessageRepository;


import org.springframework.http.HttpEntity;

import java.math.BigInteger;

public interface ShowMessageService {

    HttpEntity<?> getMessage(BigInteger id);
}
