package com.example.backend.repository;

import com.example.backend.entity.BotAdmins;
import org.springframework.data.jpa.repository.JpaRepository;

import java.math.BigInteger;

public interface BotAdminsRepository extends JpaRepository<BotAdmins, BigInteger> {
}
