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
@Table(name = "hyper_liquid_orders")
public class HyperLiquidOrders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String hash;
    private String action;
    private String block;
    private String time;
    @ManyToOne
    private BotTraders botTraders;
    private String type;
    private String actions;
    private String coin;
    private String limit_price;
    private String size;


}
