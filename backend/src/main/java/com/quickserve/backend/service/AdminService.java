package com.quickserve.backend.service;

import com.quickserve.backend.dto.AdminStatsResponse;
import com.quickserve.backend.dto.ListingApprovalRequest;
import com.quickserve.backend.model.Listing;
import com.quickserve.backend.model.User;

import java.util.List;
import java.util.Map;
import com.quickserve.backend.dto.*;
import com.quickserve.backend.model.Listing;
import com.quickserve.backend.model.User;

public interface AdminService {

    // Listing Management
    List<Listing> getPendingListings();
    List<Listing> getAllListingsByStatus(String status);
    Listing approveListing(ListingApprovalRequest request);
    Listing rejectListing(ListingApprovalRequest request);
    Listing flagListing(ListingApprovalRequest request);

    // User Management
    List<User> getAllUsers();
    List<User> getAllCustomers();
    List<User> getAllProviders();
    User getUserById(Long userId);
    void deleteUser(Long userId);

    // Statistics and Analytics
    AdminStatsResponse getDashboardStats();
    List<AdminStatsResponse.CategoryStats> getTopCategories(int limit);
    List<AdminStatsResponse.ServiceStats> getTopServices(int limit);

    // Statistical Charts Data (ADD THESE)
    Map<String, Long> getDailyBookingsLast7Days();
    Map<String, Long> getCategoryDistribution();
    Map<String, Long> getUserStatistics();
    Map<String, Double> getRevenueStatistics();

    List<ProviderStatsResponse> getAllProvidersWithStats();
    ProviderStatsResponse getProviderStats(Long providerId);
    List<ProviderReviewResponse> getProviderReviews(Long providerId);
    List<ProviderListingResponse> getProviderListings(Long providerId);
    List<ProviderStatsResponse> searchProviders(String keyword, String location);
    void updateProviderStatus(Long providerId, String status);
}