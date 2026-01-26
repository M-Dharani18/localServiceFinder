package com.quickserve.backend.controller;

import com.quickserve.backend.dto.CustomerProfileRequest;
import com.quickserve.backend.dto.CustomerProfileResponse;
import com.quickserve.backend.model.CustomerProfile;
import com.quickserve.backend.service.CustomerProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/customer/profile")
@CrossOrigin(origins = "*")
public class CustomerProfileController {

    @Autowired
    private CustomerProfileService service;

    @PostMapping("/save")
    public ResponseEntity<?> saveProfile(@RequestBody CustomerProfileRequest request) {
        try {
            CustomerProfile saved = service.upsertProfile(request);
            return ResponseEntity.ok(toResponse(saved));
        } catch (RuntimeException e) {
            // Return error message in a consistent format
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to save customer profile: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping("/{customerId}")
    public ResponseEntity<?> getProfile(@PathVariable Long customerId) {
        try {
            CustomerProfile profile = service.getByCustomerId(customerId)
                    .orElse(null);

            if (profile == null) {
                Map<String, String> errorResponse = new HashMap<>();
                errorResponse.put("error", "Profile not found for customer ID: " + customerId);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
            }

            return ResponseEntity.ok(toResponse(profile));
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to fetch profile: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping("/exists/{customerId}")
    public ResponseEntity<?> checkProfileExists(@PathVariable Long customerId) {
        try {
            boolean exists = service.existsByCustomerId(customerId);
            Map<String, Boolean> response = new HashMap<>();
            response.put("exists", exists);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to check profile existence: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @PutMapping("/update/{customerId}")
    public ResponseEntity<?> updateProfile(@PathVariable Long customerId,
                                           @RequestBody CustomerProfileRequest request) {
        try {
            // Ensure the customerId in path matches the request
            if (!customerId.equals(request.getCustomerId())) {
                Map<String, String> errorResponse = new HashMap<>();
                errorResponse.put("error", "Customer ID mismatch");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
            }

            CustomerProfile updated = service.upsertProfile(request);
            return ResponseEntity.ok(toResponse(updated));
        } catch (RuntimeException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to update profile: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    // Helper method to convert Entity to Response DTO
    private CustomerProfileResponse toResponse(CustomerProfile profile) {
        if (profile == null) {
            return null;
        }

        return new CustomerProfileResponse(
                profile.getCustomerId(),
                profile.getFullName(),
                profile.getEmail(),
                profile.getPhone(),
                profile.getAddress(),
                profile.getBio(),
                profile.getCreatedAt(),
                profile.getUpdatedAt()
        );
    }
}