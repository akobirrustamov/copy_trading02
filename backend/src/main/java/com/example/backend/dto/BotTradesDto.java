package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BotTradesDto {
    private String uid;
    private String tradername;
    private Integer trader_status;
    private Integer trader_type;
}
