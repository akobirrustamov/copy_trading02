package com.example.backend.repository;

import com.example.backend.dto.BotUserDto;
import com.example.backend.entity.BotTraders;
import com.example.backend.entity.BotUsers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigInteger;
import java.util.List;

public interface BotUsersRepository extends JpaRepository<BotUsers, BigInteger> {
//    @Query("SELECT new com.example.backend.dto.BotUserDto(u.telegramid, u.status) FROM BotUsers u")
//    List<BotUserDto> findBotUsers();

    @Query("SELECT new com.example.backend.dto.BotUserDto(u.telegramid, u.status, u.email) FROM BotUsers u WHERE CAST(u.telegramid as string ) LIKE concat('%',:search,'%') order by u.telegramid")
    List<BotUserDto> findBotUsersBySearch(@Param("search") String search);


}



