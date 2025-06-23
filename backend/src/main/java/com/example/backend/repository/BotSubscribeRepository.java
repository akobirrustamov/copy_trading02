package com.example.backend.repository;

import com.example.backend.dto.TradersForUserDto;
import com.example.backend.entity.BotSubscribe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigInteger;
import java.util.List;

public interface BotSubscribeRepository extends JpaRepository<BotSubscribe, Integer> {
    @Query(value = "SELECT * FROM subscribe s WHERE s.telegram_id = :telegramId", nativeQuery = true)
    List<BotSubscribe> findAllByTelegramId(@Param("telegramId") BigInteger telegramId);

    @Query(value = "SELECT * FROM subscribe s WHERE s.telegram_id = :id AND s.traderuid=:uid", nativeQuery = true)
    List<BotSubscribe> findAllByTelegramIdAndUser(BigInteger id, String uid);

    @Query(value = "SELECT * FROM subscribe s WHERE s.traderuid=:adminId", nativeQuery = true)
    List<BotSubscribe> findAllByTraderId(String adminId);

    @Query(value = "SELECT s.telegram_id\n" +
            "FROM subscribe s\n" +
            "         JOIN clients c ON s.telegram_id = c.telegramid\n" +
            "WHERE s.traderuid = :uid AND c.Status = 'on';", nativeQuery = true)
    List<BigInteger> findAllByTraderIdAndPosition(String uid);
}
