package com.quickserve.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ListingRatingResponse {
    
    private Long listingId;
    private String serviceName;
    private Double averageRating;
    private Long totalReviews;
}