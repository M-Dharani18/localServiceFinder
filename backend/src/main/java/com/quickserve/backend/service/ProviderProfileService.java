package com.quickserve.backend.service;

import com.quickserve.backend.dto.ProviderProfileRequest;
import com.quickserve.backend.model.ProviderProfile;

import java.util.Optional;

public interface ProviderProfileService {
    ProviderProfile upsertProfile(ProviderProfileRequest request);
    Optional<ProviderProfile> getByProviderId(Long providerId);
}
