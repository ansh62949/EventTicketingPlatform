package com.example.EventTicketingPlatform.Controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class HealthController {

    @GetMapping({"/health", "/api/v1/health"})
    public ResponseEntity<Map<String, String>> check() {
        return ResponseEntity.ok(Map.of(
            "status", "UP",
            "system", "Eventix Core",
            "telemetry", "Nominal"
        ));
    }
}
