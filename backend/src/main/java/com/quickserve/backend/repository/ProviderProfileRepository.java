package com.quickserve.backend.repository;

import com.quickserve.backend.model.ProviderProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProviderProfileRepository extends JpaRepository<ProviderProfile, Long> {
    Optional<ProviderProfile> findByProviderId(Long providerId);
    boolean existsByProviderId(Long providerId);
}
