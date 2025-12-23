package com.quickserve.backend.service.impl;

import com.quickserve.backend.dto.ProviderProfileRequest;
import com.quickserve.backend.model.ProviderProfile;
import com.quickserve.backend.repository.ProviderProfileRepository;
import com.quickserve.backend.service.ProviderProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class ProviderProfileServiceImpl implements ProviderProfileService {

    @Autowired
    private ProviderProfileRepository repository;

    @Override
    public ProviderProfile upsertProfile(ProviderProfileRequest req) {
        if (req.getProviderId() == null) throw new RuntimeException("providerId is required");
        ProviderProfile profile = repository.findByProviderId(req.getProviderId())
                .orElseGet(ProviderProfile::new);
        profile.setProviderId(req.getProviderId());
        profile.setBusinessName(req.getBusinessName());
        profile.setPhone(req.getPhone());
        profile.setCity(req.getCity());
        profile.setArea(req.getArea());
        profile.setCategories(join(req.getCategories()));
        profile.setDescription(req.getDescription());
        LocalDateTime now = LocalDateTime.now();
        if (profile.getId() == null) profile.setCreatedAt(now);
        profile.setUpdatedAt(now);
        return repository.save(profile);
    }

    @Override
    public Optional<ProviderProfile> getByProviderId(Long providerId) {
        return repository.findByProviderId(providerId);
    }

    private String join(List<String> list) {
        if (list == null) return null;
        return list.stream().map(String::trim).collect(Collectors.joining(","));
    }

    public static List<String> split(String csv) {
        if (csv == null || csv.isBlank()) return List.of();
        return Stream.of(csv.split(",")).map(String::trim).filter(s -> !s.isEmpty()).collect(Collectors.toList());
    }
}
