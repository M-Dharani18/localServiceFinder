// 3. ProviderAnalyticsService.java (Interface)
package com.quickserve.backend.service;

import com.quickserve.backend.dto.ProviderAnalyticsResponse;

public interface ProviderAnalyticsService {
    ProviderAnalyticsResponse getProviderAnalytics(Long providerId);
}
