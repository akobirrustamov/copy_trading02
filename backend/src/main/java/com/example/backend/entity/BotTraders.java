package com.example.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "traders")
public class BotTraders {
    @Id
    private String uid;
    private String tradername;
    @Column( length = 20000)
    private String traderpositions;
    private Integer pnl_trade;
    private Integer trader_status;
    private Integer trader_type;

}