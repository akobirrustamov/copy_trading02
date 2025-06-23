package com.example.backend.service.BotAdminsService;


import com.example.backend.entity.BotAdmins;
import org.springframework.http.HttpEntity;

import java.math.BigInteger;

public interface BotAdminsService {

    HttpEntity<?> addAdmin(BotAdmins admin);

    HttpEntity<?> getAdmins();

    HttpEntity<?> deleteAdmin(BigInteger adminId);
}
