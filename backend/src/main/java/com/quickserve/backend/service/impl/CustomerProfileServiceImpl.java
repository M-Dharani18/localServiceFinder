package com.quickserve.backend.service.impl;

import com.quickserve.backend.dto.CustomerProfileRequest;
import com.quickserve.backend.model.CustomerProfile;
import com.quickserve.backend.repository.CustomerProfileRepository;
import com.quickserve.backend.service.CustomerProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class CustomerProfileServiceImpl implements CustomerProfileService {

    @Autowired
    private CustomerProfileRepository repository;

    @Override
    public CustomerProfile upsertProfile(CustomerProfileRequest req) {
        if (req.getCustomerId() == null) {
            throw new RuntimeException("customerId is required");
        }

        // Validate required fields
        if (req.getFullName() == null || req.getFullName().trim().isEmpty()) {
            throw new RuntimeException("Full name is required");
        }

        CustomerProfile profile = repository.findByCustomerId(req.getCustomerId())
                .orElseGet(() -> {
                    CustomerProfile newProfile = new CustomerProfile();
                    newProfile.setCustomerId(req.getCustomerId());
                    newProfile.setCreatedAt(LocalDateTime.now());
                    return newProfile;
                });

        // SIMPLE: Just set the values without complex email validation
        profile.setFullName(req.getFullName().trim());



        profile.setPhone(req.getPhone() != null ? req.getPhone().trim() : null);
        profile.setAddress(req.getAddress() != null ? req.getAddress().trim() : null);
        profile.setBio(req.getBio() != null && !req.getBio().isEmpty() ? req.getBio().trim() : "Tell us about yourself...");
        profile.setUpdatedAt(LocalDateTime.now());

        return repository.save(profile);
    }

    @Override
    public Optional<CustomerProfile> getByCustomerId(Long customerId) {
        return repository.findByCustomerId(customerId);
    }

    @Override
    public boolean existsByCustomerId(Long customerId) {
        return repository.existsByCustomerId(customerId);
    }
}