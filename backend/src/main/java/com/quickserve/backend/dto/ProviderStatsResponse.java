// ProviderStatsResponse.java
package com.quickserve.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProviderStatsResponse {
    private Long id;
    private String username;
    private String email;
    private String location; // Add this field - can be null
    private LocalDateTime createdAt;
    private int totalListings;
    private int totalBookings;
    private int completedBookings;
    private int pendingBookings;
    private double avgRating;
    private double totalRevenue;
    private int responseRate;
}