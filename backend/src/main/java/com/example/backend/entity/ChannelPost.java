package com.example.backend.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "channelpost")
public class ChannelPost {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String traderuid;

    private String tradetype;  // Corrected variable name
    private String coinName;
    private String side;
    private Double leverage;
    private Double entryPrice;
    private Double marketPrice;
    private Double reo_position;
    private Double amount_position;
    private Double pnl;

    public ChannelPost(String traderuid, String tradetype, String coinName, String side, Double leverage, Double entryPrice, Double marketPrice, Double reo_position, Double amount_position, Double pnl) {
        this.traderuid = traderuid;
        this.tradetype = tradetype;
        this.coinName = coinName;
        this.side = side;
        this.leverage = leverage;
        this.entryPrice = entryPrice;
        this.marketPrice = marketPrice;
        this.reo_position = reo_position;
        this.amount_position = amount_position;
        this.pnl = pnl;
    }
}
