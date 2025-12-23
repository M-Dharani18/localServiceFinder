package com.quickserve.backend.dto;

import lombok.Data;
import java.util.List;

@Data
public class ProviderProfileRequest {
    private Long providerId;
    private String businessName;
    private String phone;
    private String city;
    private String area;
    private List<String> categories; // e.g. ["PLUMBING", "CLEANING"]
    private String description;
}
