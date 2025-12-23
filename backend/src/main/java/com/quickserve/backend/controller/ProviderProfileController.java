package com.quickserve.backend.controller;

import com.quickserve.backend.dto.ProviderProfileRequest;
import com.quickserve.backend.dto.ProviderProfileResponse;
import com.quickserve.backend.model.ProviderProfile;
import com.quickserve.backend.service.ProviderProfileService;
import com.quickserve.backend.service.impl.ProviderProfileServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/provider/profile")
@CrossOrigin(origins = "*")
public class ProviderProfileController {

    @Autowired
    private ProviderProfileService service;

    @PostMapping
    public ResponseEntity<?> upsert(@RequestBody ProviderProfileRequest request) {
        try {
            ProviderProfile saved = service.upsertProfile(request);
            return ResponseEntity.ok(toResponse(saved));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/{providerId}")
    public ResponseEntity<ProviderProfileResponse> get(@PathVariable Long providerId) {
        return service.getByProviderId(providerId)
                .map(p -> ResponseEntity.ok(toResponse(p)))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

    private ProviderProfileResponse toResponse(ProviderProfile p) {
        return new ProviderProfileResponse(
                p.getProviderId(),
                p.getBusinessName(),
                p.getPhone(),
                p.getCity(),
                p.getArea(),
                ProviderProfileServiceImpl.split(p.getCategories()),
                p.getDescription(),
                p.getCreatedAt(),
                p.getUpdatedAt()
        );
    }
}
