package com.example.backend.service.BotAdminsService;


import com.example.backend.entity.BotAdmins;
import com.example.backend.repository.BotAdminsRepository;
import com.example.backend.repository.BotUsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.math.BigInteger;

@Service
@RequiredArgsConstructor
public class BotAdminsServiceImpl implements BotAdminsService {
    private BotUsersRepository botUsersRepository;
    private final BotAdminsRepository adminsRepository;
    @Override
    public HttpEntity<?> addAdmin(BotAdmins admin) {

        adminsRepository.save(admin);
        return ResponseEntity.ok("Saved successfully");
    }

    @Override
    public HttpEntity<?> getAdmins() {
        return ResponseEntity.ok(adminsRepository.findAll());
    }

    @Override
    public HttpEntity<?> deleteAdmin(BigInteger adminId) {

        if ("5397857416".equals(adminId.toString()) || "5774477233".equals(adminId.toString())) {
            return ResponseEntity.ok("!");
        }
        adminsRepository.deleteById(adminId);
        return ResponseEntity.ok("Admin deleted successfully!");
    }
}