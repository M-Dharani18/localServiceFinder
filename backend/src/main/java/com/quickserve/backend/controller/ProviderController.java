// 2. ProviderController.java
package com.quickserve.backend.controller;

import com.quickserve.backend.dto.ProviderAnalyticsResponse;
import com.quickserve.backend.service.ProviderAnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/provider")
@CrossOrigin(origins = "*")
public class ProviderController {

    @Autowired
    private ProviderAnalyticsService providerAnalyticsService;

    /**
     * Get analytics data for a specific provider
     * GET /api/provider/analytics/{providerId}
     */
    @GetMapping("/analytics/{providerId}")
    public ResponseEntity<ProviderAnalyticsResponse> getProviderAnalytics(
            @PathVariable Long providerId) {
        try {
            ProviderAnalyticsResponse analytics = providerAnalyticsService.getProviderAnalytics(providerId);
            return ResponseEntity.ok(analytics);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}

