package com.example.backend.controller;

import com.example.backend.dto.BotTradesDto;
import com.example.backend.entity.BotAdmins;
import com.example.backend.service.BotAdminsService.BotAdminsService;
import com.example.backend.service.BotTradersService.BotTradersService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/newtraders")
public class SouthKoreaTradersController {
    private final BotTradersService botTradersService;

    @PostMapping
    public HttpEntity<?> addTrader(@RequestBody BotTradesDto tradesDto) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<BotTradesDto> requestEntity = new HttpEntity<>(tradesDto, headers);

        RestTemplate restTemplate = new RestTemplate();

        ResponseEntity<Void> voidResponseEntity = restTemplate.postForEntity("http://93.93.207.43:8080/api/v1/traders", requestEntity, Void.class);
        return ResponseEntity.ok(voidResponseEntity);
    }

    @GetMapping
    public HttpEntity<?> getTraders() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<?> requestEntity = new HttpEntity<>(headers);

        RestTemplate restTemplate = new RestTemplate();

        ResponseEntity<List> exchange = restTemplate.exchange("http://93.93.207.43:8080/api/v1/traders", HttpMethod.GET, requestEntity, List.class);
//        System.out.println(exchange);
        return ResponseEntity.ok(exchange);
    }

    @DeleteMapping("/{adminId}")
    public HttpEntity<?> deleteTrader(@PathVariable String adminId) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<?> requestEntity = new HttpEntity<>(headers);

        RestTemplate restTemplate = new RestTemplate();

        ResponseEntity<Void> exchange = restTemplate.exchange("http://93.93.207.43:8080/api/v1/traders/" + adminId, HttpMethod.DELETE, requestEntity, Void.class);
        return ResponseEntity.ok(exchange);
    }
}
