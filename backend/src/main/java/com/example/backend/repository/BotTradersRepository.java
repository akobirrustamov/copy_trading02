package com.example.backend.repository;

import com.example.backend.dto.TradersForUserDto;
import com.example.backend.entity.BotTraders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import java.math.BigInteger;
import java.util.List;

public interface BotTradersRepository extends JpaRepository<BotTraders, String> {
    @Query(value = "SELECT t.tradername, t.pnl_trade, CASE WHEN s.traderuid IS NOT NULL THEN true ELSE false END as active " +
            "FROM traders t " +
            "LEFT JOIN subscriber s ON t.uid = s.traderuid AND s.telegram_id = :userId", nativeQuery = true)
    List<TradersForUserDto> getTradersForUser(@Param("userId") BigInteger userId);

}
