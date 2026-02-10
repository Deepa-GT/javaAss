package com.example.itemmanagement.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    @GetMapping("/")
    public String healthCheck() {
        return "Java Item Management API is running!";
    }

    @GetMapping("/health")
    public String health() {
        return "OK";
    }

    @GetMapping("/api/health")
    public String apiHealth() {
        return "OK";
    }

    @GetMapping("/api/items/health")
    public String itemsHealth() {
        return "OK";
    }
}
