// ProviderListingResponse.java
package com.quickserve.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProviderListingResponse {
    private Long id;
    private String title;
    private String description;
    private String category;
    private double price;
    private String status;
    private boolean isAvailable;
    private LocalDateTime createdAt;
    private int bookingCount;
    private double averageRating;
}