package com.quickserve.backend.dto;

import lombok.Data;

@Data
public class ListingResponse {

    private Long id;
    private String serviceName;
    private String description;
    private Double price;
    private String location;
    private String category;
    private String imageUrl;
    private Long providerId;
    private String providerName;
    private Boolean isAvailable;
    private Double latitude;
    private Double longitude;
    private Double distance; // Distance from search location (in km)
}