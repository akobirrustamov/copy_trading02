package com.example.backend.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigInteger;
import java.util.UUID;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class OpenOrder {
    private BigInteger telegramid;
    private String client;
    private String order_positions;

}