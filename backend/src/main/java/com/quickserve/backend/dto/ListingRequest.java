package com.quickserve.backend.dto;

import lombok.Data;

@Data
public class ListingRequest {

    private String serviceName;
    private String description;
    private Double price;
    private String location;
    private String category;
    private String imageUrl;
    private Boolean isAvailable; 
    private Double latitude;
    private Double longitude;
}