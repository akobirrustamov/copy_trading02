package com.example.backend.controller;

import com.example.backend.dto.UserDTO;
import com.example.backend.entity.BotAdmins;
import com.example.backend.service.BotAdminsService.BotAdminsService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/admins")
public class BotAdminsController {
    private final BotAdminsService botAdminsService;
    @PostMapping
    public HttpEntity<?> addAdmin( @RequestBody BotAdmins admin) {
        return botAdminsService.addAdmin(admin);
    }

    @GetMapping
    public HttpEntity<?> getAdmins(){
        return botAdminsService.getAdmins();
    }

    @DeleteMapping("/{adminId}")
    public HttpEntity<?> deleteAdmin(@PathVariable BigInteger adminId) {
//        System.out.println(adminId);
        return botAdminsService.deleteAdmin(adminId);
    }

}
