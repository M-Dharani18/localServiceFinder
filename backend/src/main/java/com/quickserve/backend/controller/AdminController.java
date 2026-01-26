package com.quickserve.backend.controller;

import com.quickserve.backend.dto.AdminStatsResponse;
import com.quickserve.backend.dto.ListingApprovalRequest;
import com.quickserve.backend.model.Listing;
import com.quickserve.backend.model.User;
import com.quickserve.backend.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.quickserve.backend.dto.ProviderStatsResponse;
import com.quickserve.backend.dto.ProviderReviewResponse;
import com.quickserve.backend.dto.ProviderListingResponse;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private AdminService adminService;

    // ==================== DASHBOARD & STATISTICS ====================

    @GetMapping("/stats")
    public ResponseEntity<AdminStatsResponse> getDashboardStats() {
        AdminStatsResponse stats = adminService.getDashboardStats();
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/top-categories")
    public ResponseEntity<List<AdminStatsResponse.CategoryStats>> getTopCategories(
            @RequestParam(defaultValue = "5") int limit) {
        List<AdminStatsResponse.CategoryStats> categories = adminService.getTopCategories(limit);
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/top-services")
    public ResponseEntity<List<AdminStatsResponse.ServiceStats>> getTopServices(
            @RequestParam(defaultValue = "5") int limit) {
        List<AdminStatsResponse.ServiceStats> services = adminService.getTopServices(limit);
        return ResponseEntity.ok(services);
    }

    // ==================== LISTING MANAGEMENT ====================

    @GetMapping("/listings/pending")
    public ResponseEntity<List<Listing>> getPendingListings() {
        List<Listing> listings = adminService.getPendingListings();
        return ResponseEntity.ok(listings);
    }

    @GetMapping("/listings")
    public ResponseEntity<List<Listing>> getAllListingsByStatus(
            @RequestParam(required = false, defaultValue = "PENDING") String status) {
        List<Listing> listings = adminService.getAllListingsByStatus(status);
        return ResponseEntity.ok(listings);
    }

    @PostMapping("/listings/approve")
    public ResponseEntity<Listing> approveListing(@RequestBody ListingApprovalRequest request) {
        try {
            Listing listing = adminService.approveListing(request);
            return ResponseEntity.ok(listing);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @PostMapping("/listings/reject")
    public ResponseEntity<Listing> rejectListing(@RequestBody ListingApprovalRequest request) {
        try {
            Listing listing = adminService.rejectListing(request);
            return ResponseEntity.ok(listing);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @PostMapping("/listings/flag")
    public ResponseEntity<Listing> flagListing(@RequestBody ListingApprovalRequest request) {
        try {
            Listing listing = adminService.flagListing(request);
            return ResponseEntity.ok(listing);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    // ==================== USER MANAGEMENT ====================

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = adminService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/users/customers")
    public ResponseEntity<List<User>> getAllCustomers() {
        List<User> customers = adminService.getAllCustomers();
        return ResponseEntity.ok(customers);
    }

    @GetMapping("/users/providers")
    public ResponseEntity<List<User>> getAllProviders() {
        List<User> providers = adminService.getAllProviders();
        return ResponseEntity.ok(providers);
    }

    @GetMapping("/users/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable Long userId) {
        try {
            User user = adminService.getUserById(userId);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @DeleteMapping("/users/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable Long userId) {
        try {
            adminService.deleteUser(userId);
            return ResponseEntity.ok("User deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }


    @GetMapping("/stats/daily-bookings")
    public ResponseEntity<Map<String, Long>> getDailyBookings() {
        Map<String, Long> dailyBookings = adminService.getDailyBookingsLast7Days();
        return ResponseEntity.ok(dailyBookings);
    }

    @GetMapping("/stats/category-distribution")
    public ResponseEntity<Map<String, Long>> getCategoryDistribution() {
        Map<String, Long> distribution = adminService.getCategoryDistribution();
        return ResponseEntity.ok(distribution);
    }

    @GetMapping("/stats/revenue")
    public ResponseEntity<Map<String, Double>> getRevenueStats() {
        Map<String, Double> revenue = adminService.getRevenueStatistics();
        return ResponseEntity.ok(revenue);
    }

    @GetMapping("/stats/user-statistics")
    public ResponseEntity<Map<String, Long>> getUserStatistics() {
        Map<String, Long> stats = adminService.getUserStatistics();
        return ResponseEntity.ok(stats);
    }
    @GetMapping("/providers")
    public ResponseEntity<List<ProviderStatsResponse>> getAllProvidersWithStats() {
        List<ProviderStatsResponse> providers = adminService.getAllProvidersWithStats();
        return ResponseEntity.ok(providers);
    }

    @GetMapping("/providers/{providerId}/stats")
    public ResponseEntity<ProviderStatsResponse> getProviderStats(@PathVariable Long providerId) {
        try {
            ProviderStatsResponse stats = adminService.getProviderStats(providerId);
            return ResponseEntity.ok(stats);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/providers/{providerId}/reviews")
    public ResponseEntity<List<ProviderReviewResponse>> getProviderReviews(@PathVariable Long providerId) {
        List<ProviderReviewResponse> reviews = adminService.getProviderReviews(providerId);
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("/providers/{providerId}/listings")
    public ResponseEntity<List<ProviderListingResponse>> getProviderListings(@PathVariable Long providerId) {
        List<ProviderListingResponse> listings = adminService.getProviderListings(providerId);
        return ResponseEntity.ok(listings);
    }

    @GetMapping("/providers/search")
    public ResponseEntity<List<ProviderStatsResponse>> searchProviders(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String location) {
        List<ProviderStatsResponse> providers = adminService.searchProviders(keyword, location);
        return ResponseEntity.ok(providers);
    }

    @PutMapping("/providers/{providerId}/status")
    public ResponseEntity<String> updateProviderStatus(
            @PathVariable Long providerId,
            @RequestParam String status) {
        try {
            adminService.updateProviderStatus(providerId, status);
            return ResponseEntity.ok("Provider status updated successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

}