package com.quickserve.backend.service;

import com.quickserve.backend.dto.CustomerProfileRequest;
import com.quickserve.backend.model.CustomerProfile;
import java.util.Optional;

public interface CustomerProfileService {
    CustomerProfile upsertProfile(CustomerProfileRequest request);
    Optional<CustomerProfile> getByCustomerId(Long customerId);
    boolean existsByCustomerId(Long customerId);
}