package com.example.backend.repository;

import com.example.backend.entity.HistoryOfTrade;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface HistoryOfTradeRepository  extends JpaRepository<HistoryOfTrade, UUID> {
}
