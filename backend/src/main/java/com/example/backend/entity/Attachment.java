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
    @Table(name = "usertradeimage")
    public class Attachment {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Integer id;
        private Boolean position;
        private Boolean profit;
        private Double entryPrice;
        private Double closePrice;
        private BigInteger telegram_id_user;
        private BigInteger update_time;
        private String photoId;
        private String coinName;
    
    
    }
