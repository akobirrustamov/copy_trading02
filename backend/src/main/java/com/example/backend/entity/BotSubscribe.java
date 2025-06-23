package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigInteger;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "subscribe")
public class BotSubscribe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private BigInteger telegram_id;
    private String traderuid;

    public BotSubscribe(BigInteger telegram_id, String traderuid) {
        this.telegram_id = telegram_id;
        this.traderuid = traderuid;
    }
}