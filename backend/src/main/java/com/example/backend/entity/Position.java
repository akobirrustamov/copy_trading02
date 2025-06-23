package com.example.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Position {
    private String symbol;
    private Double entryPrice;
    private Double markPrice;
    private Double pnl;
    private Double roe;
    private Double amount;
    private long updateTimeStamp;
    private boolean tradeBefore;
    private boolean isLong;
    private boolean isShort;
    private Double leverage;

    @Override
    public String toString() {
        return "{'symbol':'"+symbol+"',"+
                "'entryPrice':" +entryPrice+","+
                "'markPrice':" +markPrice+","+
                "'pnl':" +pnl+","+
                "'roe':" +roe+","+
                "'amount':" +amount+","+
                "'updateTimeStamp':" +updateTimeStamp+","+
                "'tradeBefore':" +tradeBefore+","+
                "'long':" +isLong+","+
                "'short':" +isShort+","+
                "'leverage':" +leverage+","+
                "}";
    }
}
