package com.quickserve.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProviderProfileResponse {
    private Long providerId;
    private String businessName;
    private String phone;
    private String city;
    private String area;
    private List<String> categories;
    private String description;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
