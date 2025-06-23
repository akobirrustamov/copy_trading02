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
@Table(name = "notification")
public class ShowMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private BigInteger telegramid;
    private Boolean status;
    private String messagetext;

    public ShowMessage(BigInteger telegramid, Boolean status, String messagetext) {
        this.telegramid = telegramid;
        this.status = status;
        this.messagetext = messagetext;
    }
}
