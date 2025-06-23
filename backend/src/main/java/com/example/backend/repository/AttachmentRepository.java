package com.example.backend.repository;

import com.example.backend.entity.Attachment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigInteger;
import java.util.List;

public interface AttachmentRepository extends JpaRepository<Attachment, BigInteger> {
    @Query(value = "SELECT * FROM usertradeimage WHERE telegram_id_user = :id ORDER BY update_time DESC", nativeQuery = true)
    List<Attachment> findAllByTelegramId(BigInteger id);
}
