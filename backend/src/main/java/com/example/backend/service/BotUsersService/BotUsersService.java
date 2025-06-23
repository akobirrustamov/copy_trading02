package com.example.backend.service.BotUsersService;


import com.example.backend.entity.BotUsers;
import org.springframework.http.HttpEntity;

import java.math.BigInteger;

public interface BotUsersService {

    HttpEntity<?> getUsers(String search);

    HttpEntity<?> changeStatus(BigInteger id);

    HttpEntity<?> getMe(BigInteger id);

    HttpEntity<?> getTraders(BigInteger id);

    HttpEntity<?> setSubscriber(BigInteger id, String uid);

    HttpEntity<?> setting(BotUsers botUser);
}
