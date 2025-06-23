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
@Table(name = "history")
public class HistoryOfTrade {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String serverId;

    private String position;
    @Column( length = 20000)
    private String orders;
    @Column( length = 20000)
    private String userId;

    public HistoryOfTrade(String serverId, String position, String order, String user) {
        this.serverId = serverId;
        this.position = position;
        this.orders = order;
        this.userId = user;
    }

}
