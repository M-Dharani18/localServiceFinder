package com.quickserve.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminStatsResponse {

    // Overall statistics
    private Long totalUsers;
    private Long totalCustomers;
    private Long totalProviders;
    private Long totalListings;
    private Long pendingListings;
    private Long approvedListings;
    private Long totalBookings;
    private Long completedBookings;
    private Long totalReviews;
    private Double averageRating;

    private List<CategoryStats> topCategories;

   
    private List<ServiceStats> topServices;

   
    private List<ActivityLog> recentActivity;

   
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CategoryStats {
        private String category;
        private Long bookingCount;
        private Long listingCount;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ServiceStats {
        private Long listingId;
        private String serviceName;
        private String providerName;
        private String category;
        private Long bookingCount;
        private Double averageRating;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ActivityLog {
        private String type; // "listing", "booking", "review", "user"
        private String message;
        private String timestamp;
    }
}