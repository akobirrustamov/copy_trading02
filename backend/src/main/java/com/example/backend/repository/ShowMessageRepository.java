package com.example.backend.repository;

import com.example.backend.dto.BotUserDto;
import com.example.backend.entity.ShowMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigInteger;
import java.util.List;

public interface ShowMessageRepository extends JpaRepository<ShowMessage, BigInteger> {

    @Query("SELECT n FROM ShowMessage n WHERE n.telegramid = :telegramid ORDER BY n.id DESC")
    List<ShowMessage> findAllByTelegramId(@Param("telegramid") BigInteger telegramid);


}

