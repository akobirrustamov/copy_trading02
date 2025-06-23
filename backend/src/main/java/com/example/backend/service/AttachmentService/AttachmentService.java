package com.example.backend.service.AttachmentService;


import org.springframework.http.HttpEntity;

import java.math.BigInteger;

public interface AttachmentService {

    HttpEntity<?> getImage(BigInteger id);

}
