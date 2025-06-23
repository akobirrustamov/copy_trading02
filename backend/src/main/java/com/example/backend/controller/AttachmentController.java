package com.example.backend.controller;

import com.example.backend.service.AttachmentService.AttachmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigInteger;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/image")
public class AttachmentController {
    private final AttachmentService attachmentService;
    @GetMapping
    public HttpEntity<?> setSubscriber(@RequestParam BigInteger id) {
        System.out.println("pp");
        return attachmentService.getImage(id);
    }
}
