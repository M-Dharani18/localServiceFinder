package com.quickserve.backend.dto;

import lombok.Data;

@Data
public class SearchFilterRequest {

    private String keyword; // Search in service name and description
    private String category;
    private String location;
    private Double minPrice;
    private Double maxPrice;
    private Double latitude; // User's current location for proximity search
    private Double longitude;
    private Double maxDistance; // Max distance in kilometers
    private String sortBy; // "price_asc", "price_desc", "distance", "relevance"
}