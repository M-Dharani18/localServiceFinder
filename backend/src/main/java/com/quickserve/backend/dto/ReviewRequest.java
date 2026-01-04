package com.quickserve.backend.dto;

import lombok.Data;

@Data
public class ReviewRequest {
    
    private Long bookingId;
    private Long customerId;
    private Integer rating;  // 1-5 stars
    private String comment;  // Optional
}