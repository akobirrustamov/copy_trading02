package com.example.backend.repository;

import com.example.backend.entity.ChannelPost;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ChannelPostRepository extends JpaRepository<ChannelPost, Integer> {
}