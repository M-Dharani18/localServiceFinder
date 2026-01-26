// 1. ProviderAnalyticsResponse.java (DTO)
package com.quickserve.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProviderAnalyticsResponse {

    // Summary Statistics
    private Long totalBookings;
    private Long pendingBookings;
    private Long confirmedBookings;
    private Long completedBookings;
    private Long cancelledBookings;
    private Double totalRevenue;
    private Double averageRating;
    private Long totalReviews;

    // Charts Data
    private List<MonthlyBooking> monthlyBookings;
    private List<CategoryBreakdown> categoryBreakdown;
    private List<RecentBooking> recentBookings;

    // Additional Metrics
    private Double monthlyRevenue;
    private Double weeklyRevenue;
    private Integer activeListings;
    private Integer totalListings;

    // Nested classes for structured data

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MonthlyBooking {
        private String month;
        private Long bookings;
        private Double revenue;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CategoryBreakdown {
        private String category;
        private Long count;
        private Double revenue;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RecentBooking {
        private Long id;
        private String customerName;
        private String serviceName;
        private LocalDateTime bookingDateTime;
        private String status;
        private Double price;
    }
}