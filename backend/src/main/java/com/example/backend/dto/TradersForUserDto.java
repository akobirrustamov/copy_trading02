package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TradersForUserDto {
    private String uid;
    private String tradername;
//    private String traderposition;
    private Integer pnl_trade;
    private boolean active;
    private Integer trader_status;

}
