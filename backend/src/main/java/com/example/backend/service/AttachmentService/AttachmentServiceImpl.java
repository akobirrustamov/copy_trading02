package com.example.backend.service.AttachmentService;


import com.example.backend.entity.Attachment;
import com.example.backend.repository.AttachmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AttachmentServiceImpl implements AttachmentService {
    private final AttachmentRepository attachmentRepository;
    @Override
    public HttpEntity<?> getImage(BigInteger id) {
        List<Attachment> allByTelegramId = attachmentRepository.findAllByTelegramId(id);
        return ResponseEntity.ok(allByTelegramId);
    }
}