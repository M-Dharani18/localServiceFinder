//package com.quickserve.backend.service.impl;
//
//import com.quickserve.backend.dto.AdminStatsResponse;
//import com.quickserve.backend.dto.ListingApprovalRequest;
//import com.quickserve.backend.model.*;
//import com.quickserve.backend.repository.*;
//import com.quickserve.backend.service.AdminService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.time.LocalDateTime;
//import java.util.ArrayList;
//import java.util.List;
//import java.util.stream.Collectors;
//import java.util.Map;
//import java.util.LinkedHashMap;
//import java.util.List;
//import java.time.LocalDate;
//import org.springframework.stereotype.Service;
//
//@Service
//@Transactional
//public class AdminServiceImpl implements AdminService {
//
//    @Autowired
//    private ListingRepository listingRepository;
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private BookingRepository bookingRepository;
//
//    @Autowired
//    private ReviewRepository reviewRepository;
//
//    @Override
//    public List<Listing> getPendingListings() {
//        return listingRepository.findPendingListings();
//    }
//
//    @Override
//    public List<Listing> getAllListingsByStatus(String status) {
//        try {
//            ListingStatus listingStatus = ListingStatus.valueOf(status.toUpperCase());
//            return listingRepository.findByStatus(listingStatus);
//        } catch (IllegalArgumentException e) {
//            throw new RuntimeException("Invalid status: " + status);
//        }
//    }
//
//    @Override
//    public Listing approveListing(ListingApprovalRequest request) {
//        // Validate admin
//        User admin = userRepository.findById(request.getAdminId())
//                .orElseThrow(() -> new RuntimeException("Admin not found"));
//
//        if (!"ADMIN".equals(admin.getRole())) {
//            throw new RuntimeException("User is not an admin");
//        }
//
//        // Get listing
//        Listing listing = listingRepository.findById(request.getListingId())
//                .orElseThrow(() -> new RuntimeException("Listing not found"));
//
//        // Update status
//        listing.setStatus(ListingStatus.APPROVED);
//        listing.setAdminNotes(request.getAdminNotes());
//        listing.setReviewedBy(admin);
//
//        return listingRepository.save(listing);
//    }
//
//    @Override
//    public Listing rejectListing(ListingApprovalRequest request) {
//        User admin = userRepository.findById(request.getAdminId())
//                .orElseThrow(() -> new RuntimeException("Admin not found"));
//
//        if (!"ADMIN".equals(admin.getRole())) {
//            throw new RuntimeException("User is not an admin");
//        }
//
//        Listing listing = listingRepository.findById(request.getListingId())
//                .orElseThrow(() -> new RuntimeException("Listing not found"));
//
//        listing.setStatus(ListingStatus.REJECTED);
//        listing.setAdminNotes(request.getAdminNotes());
//        listing.setReviewedBy(admin);
//
//        return listingRepository.save(listing);
//    }
//
//    @Override
//    public Listing flagListing(ListingApprovalRequest request) {
//        User admin = userRepository.findById(request.getAdminId())
//                .orElseThrow(() -> new RuntimeException("Admin not found"));
//
//        if (!"ADMIN".equals(admin.getRole())) {
//            throw new RuntimeException("User is not an admin");
//        }
//
//        Listing listing = listingRepository.findById(request.getListingId())
//                .orElseThrow(() -> new RuntimeException("Listing not found"));
//
//        listing.setStatus(ListingStatus.FLAGGED);
//        listing.setAdminNotes(request.getAdminNotes());
//        listing.setReviewedBy(admin);
//
//        return listingRepository.save(listing);
//    }
//
//    @Override
//    public List<User> getAllUsers() {
//        return userRepository.findAll();
//    }
//
//    @Override
//    public List<User> getAllCustomers() {
//        return userRepository.findAll().stream()
//                .filter(user -> "CUSTOMER".equals(user.getRole()))
//                .collect(Collectors.toList());
//    }
//
//    @Override
//    public List<User> getAllProviders() {
//        return userRepository.findAll().stream()
//                .filter(user -> "PROVIDER".equals(user.getRole()))
//                .collect(Collectors.toList());
//    }
//
//    @Override
//    public User getUserById(Long userId) {
//        return userRepository.findById(userId)
//                .orElseThrow(() -> new RuntimeException("User not found"));
//    }
//
//    @Override
//    public void deleteUser(Long userId) {
//        if (!userRepository.existsById(userId)) {
//            throw new RuntimeException("User not found");
//        }
//        userRepository.deleteById(userId);
//    }
//
//    @Override
//    public AdminStatsResponse getDashboardStats() {
//        AdminStatsResponse stats = new AdminStatsResponse();
//
//        // User statistics
//        List<User> allUsers = userRepository.findAll();
//        stats.setTotalUsers((long) allUsers.size());
//        stats.setTotalCustomers(allUsers.stream().filter(u -> "CUSTOMER".equals(u.getRole())).count());
//        stats.setTotalProviders(allUsers.stream().filter(u -> "PROVIDER".equals(u.getRole())).count());
//
//        // Listing statistics
//        stats.setTotalListings(listingRepository.count());
//        stats.setPendingListings(listingRepository.countByStatus(ListingStatus.PENDING));
//        stats.setApprovedListings(listingRepository.countByStatus(ListingStatus.APPROVED));
//
//        // Booking statistics
//        List<Booking> allBookings = bookingRepository.findAll();
//        stats.setTotalBookings((long) allBookings.size());
//        stats.setCompletedBookings(allBookings.stream()
//                .filter(b -> b.getStatus() == BookingStatus.COMPLETED)
//                .count());
//
//        // Review statistics
//        List<Review> allReviews = reviewRepository.findAll();
//        stats.setTotalReviews((long) allReviews.size());
//
//        if (!allReviews.isEmpty()) {
//            double avgRating = allReviews.stream()
//                    .mapToDouble(Review::getRating)
//                    .average()
//                    .orElse(0.0);
//            stats.setAverageRating(avgRating);
//        } else {
//            stats.setAverageRating(0.0);
//        }
//
//        // Top categories
//        stats.setTopCategories(getTopCategories(5));
//
//        // Top services
//        stats.setTopServices(getTopServices(5));
//
//        return stats;
//    }
//
//    @Override
//    public List<AdminStatsResponse.CategoryStats> getTopCategories(int limit) {
//        List<Object[]> results = listingRepository.findTopCategories();
//        List<AdminStatsResponse.CategoryStats> categoryStats = new ArrayList<>();
//
//        for (int i = 0; i < Math.min(results.size(), limit); i++) {
//            Object[] row = results.get(i);
//            String category = (String) row[0];
//            Long bookingCount = ((Number) row[1]).longValue();
//
//            // Get listing count for this category
//            Long listingCount = listingRepository.countListingsByCategory(ListingStatus.APPROVED)
//                    .stream()
//                    .filter(r -> category.equals(r[0]))
//                    .map(r -> ((Number) r[1]).longValue())
//                    .findFirst()
//                    .orElse(0L);
//
//            categoryStats.add(new AdminStatsResponse.CategoryStats(category, bookingCount, listingCount));
//        }
//
//        return categoryStats;
//    }
//
//    @Override
//    public List<AdminStatsResponse.ServiceStats> getTopServices(int limit) {
//        List<Object[]> results = listingRepository.findTopServices();
//        List<AdminStatsResponse.ServiceStats> serviceStats = new ArrayList<>();
//
//        for (int i = 0; i < Math.min(results.size(), limit); i++) {
//            Object[] row = results.get(i);
//            Long listingId = ((Number) row[0]).longValue();
//            String serviceName = (String) row[1];
//            String providerName = (String) row[2];
//            String category = (String) row[3];
//            Long bookingCount = ((Number) row[4]).longValue();
//
//            // Get average rating for this listing
//            Double avgRating = reviewRepository.getAverageRatingForListing(listingId);
//
//            serviceStats.add(new AdminStatsResponse.ServiceStats(
//                    listingId, serviceName, providerName, category,
//                    bookingCount, avgRating != null ? avgRating : 0.0
//            ));
//        }
//
//        return serviceStats;
//    }
//
//    // Add these methods to your AdminServiceImpl.java
//    // In AdminServiceImpl.java - update these methods
//// In AdminServiceImpl.java
//    @Override
//    public Map<String, Double> getRevenueStatistics() {
//        Map<String, Double> revenueStats = new LinkedHashMap<>();
//
//        // Get revenue data using fixed repository methods
//        Double totalRevenue = bookingRepository.calculateTotalRevenue();
//        Double avgBookingValue = bookingRepository.calculateAverageBookingValue();
//        Double monthlyRevenue = bookingRepository.calculateMonthlyRevenue();
//
//        // Weekly revenue using parameter method
//        LocalDateTime weekStart = LocalDateTime.now().minusDays(7);
//        Double weeklyRevenue = bookingRepository.calculateWeeklyRevenue(weekStart);
//
//        revenueStats.put("totalRevenue", totalRevenue != null ? totalRevenue : 0.0);
//        revenueStats.put("averageBookingValue", avgBookingValue != null ? avgBookingValue : 0.0);
//        revenueStats.put("monthlyRevenue", monthlyRevenue != null ? monthlyRevenue : 0.0);
//        revenueStats.put("weeklyRevenue", weeklyRevenue != null ? weeklyRevenue : 0.0);
//
//        // Add booking counts
//        Long totalBookings = bookingRepository.count();
//        Long completedBookings = bookingRepository.countByStatus(BookingStatus.COMPLETED);
//
//        revenueStats.put("totalBookings", totalBookings.doubleValue());
//        revenueStats.put("completedBookings", completedBookings.doubleValue());
//
//        return revenueStats;
//    }
//
//    @Override
//    public Map<String, Long> getDailyBookingsLast7Days() {
//        LocalDateTime sevenDaysAgo = LocalDateTime.now().minusDays(7);
//
//        // Use the repository method
//        List<Object[]> results = bookingRepository.findDailyBookingsSince(sevenDaysAgo);
//
//        Map<String, Long> dailyBookings = new LinkedHashMap<>();
//
//        // Initialize last 7 days
//        for (int i = 6; i >= 0; i--) {
//            LocalDate date = LocalDate.now().minusDays(i);
//            dailyBookings.put(date.toString(), 0L);
//        }
//
//        // Fill with actual data
//        for (Object[] row : results) {
//            String dateStr = row[0].toString(); // Date as string
//            Long count = ((Number) row[1]).longValue();
//            dailyBookings.put(dateStr, count);
//        }
//
//        return dailyBookings;
//    }
//
//    @Override
//    public Map<String, Long> getCategoryDistribution() {
//        // Use the new repository method
//        List<Object[]> results = bookingRepository.findBookingCountByCategory();
//
//        Map<String, Long> distribution = new LinkedHashMap<>();
//
//        for (Object[] row : results) {
//            String category = (String) row[0];
//            Long count = ((Number) row[1]).longValue();
//            distribution.put(category, count);
//        }
//
//        return distribution;
//    }
//    @Override
//    public Map<String, Long> getUserStatistics() {
//        List<User> allUsers = userRepository.findAll();
//
//        Map<String, Long> stats = new LinkedHashMap<>();
//        stats.put("totalUsers", (long) allUsers.size());
//        stats.put("customers", allUsers.stream()
//                .filter(u -> "CUSTOMER".equals(u.getRole())).count());
//        stats.put("providers", allUsers.stream()
//                .filter(u -> "PROVIDER".equals(u.getRole())).count());
//        stats.put("activeUsers", 0L); // Placeholder
//        stats.put("newUsersThisMonth", 0L); // Placeholder
//
//        return stats;
//    }
//}




package com.quickserve.backend.service.impl;

import com.quickserve.backend.dto.AdminStatsResponse;
import com.quickserve.backend.dto.ListingApprovalRequest;
import com.quickserve.backend.dto.ProviderStatsResponse;
import com.quickserve.backend.dto.ProviderReviewResponse;
import com.quickserve.backend.dto.ProviderListingResponse;
import com.quickserve.backend.model.*;
import com.quickserve.backend.repository.*;
import com.quickserve.backend.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class AdminServiceImpl implements AdminService {

    @Autowired
    private ListingRepository listingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    // ... existing methods (keeping all your current methods) ...

    @Override
    public List<Listing> getPendingListings() {
        return listingRepository.findPendingListings();
    }

    @Override
    public List<Listing> getAllListingsByStatus(String status) {
        try {
            ListingStatus listingStatus = ListingStatus.valueOf(status.toUpperCase());
            return listingRepository.findByStatus(listingStatus);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid status: " + status);
        }
    }

    @Override
    public Listing approveListing(ListingApprovalRequest request) {
        // Validate admin
        User admin = userRepository.findById(request.getAdminId())
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        if (!"ADMIN".equals(admin.getRole())) {
            throw new RuntimeException("User is not an admin");
        }

        // Get listing
        Listing listing = listingRepository.findById(request.getListingId())
                .orElseThrow(() -> new RuntimeException("Listing not found"));

        // Update status
        listing.setStatus(ListingStatus.APPROVED);
        listing.setAdminNotes(request.getAdminNotes());
        listing.setReviewedBy(admin);

        return listingRepository.save(listing);
    }

    @Override
    public Listing rejectListing(ListingApprovalRequest request) {
        User admin = userRepository.findById(request.getAdminId())
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        if (!"ADMIN".equals(admin.getRole())) {
            throw new RuntimeException("User is not an admin");
        }

        Listing listing = listingRepository.findById(request.getListingId())
                .orElseThrow(() -> new RuntimeException("Listing not found"));

        listing.setStatus(ListingStatus.REJECTED);
        listing.setAdminNotes(request.getAdminNotes());
        listing.setReviewedBy(admin);

        return listingRepository.save(listing);
    }

    @Override
    public Listing flagListing(ListingApprovalRequest request) {
        User admin = userRepository.findById(request.getAdminId())
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        if (!"ADMIN".equals(admin.getRole())) {
            throw new RuntimeException("User is not an admin");
        }

        Listing listing = listingRepository.findById(request.getListingId())
                .orElseThrow(() -> new RuntimeException("Listing not found"));

        listing.setStatus(ListingStatus.FLAGGED);
        listing.setAdminNotes(request.getAdminNotes());
        listing.setReviewedBy(admin);

        return listingRepository.save(listing);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public List<User> getAllCustomers() {
        return userRepository.findAll().stream()
                .filter(user -> "CUSTOMER".equals(user.getRole()))
                .collect(Collectors.toList());
    }

    @Override
    public List<User> getAllProviders() {
        return userRepository.findAll().stream()
                .filter(user -> "PROVIDER".equals(user.getRole()))
                .collect(Collectors.toList());
    }

    @Override
    public User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public void deleteUser(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new RuntimeException("User not found");
        }
        userRepository.deleteById(userId);
    }

    @Override
    public AdminStatsResponse getDashboardStats() {
        AdminStatsResponse stats = new AdminStatsResponse();

        // User statistics
        List<User> allUsers = userRepository.findAll();
        stats.setTotalUsers((long) allUsers.size());
        stats.setTotalCustomers(allUsers.stream().filter(u -> "CUSTOMER".equals(u.getRole())).count());
        stats.setTotalProviders(allUsers.stream().filter(u -> "PROVIDER".equals(u.getRole())).count());

        // Listing statistics
        stats.setTotalListings(listingRepository.count());
        stats.setPendingListings(listingRepository.countByStatus(ListingStatus.PENDING));
        stats.setApprovedListings(listingRepository.countByStatus(ListingStatus.APPROVED));

        // Booking statistics
        List<Booking> allBookings = bookingRepository.findAll();
        stats.setTotalBookings((long) allBookings.size());
        stats.setCompletedBookings(allBookings.stream()
                .filter(b -> b.getStatus() == BookingStatus.COMPLETED)
                .count());

        // Review statistics
        List<Review> allReviews = reviewRepository.findAll();
        stats.setTotalReviews((long) allReviews.size());

        if (!allReviews.isEmpty()) {
            double avgRating = allReviews.stream()
                    .mapToDouble(Review::getRating)
                    .average()
                    .orElse(0.0);
            stats.setAverageRating(avgRating);
        } else {
            stats.setAverageRating(0.0);
        }

        // Top categories
        stats.setTopCategories(getTopCategories(5));

        // Top services
        stats.setTopServices(getTopServices(5));

        return stats;
    }

    @Override
    public List<AdminStatsResponse.CategoryStats> getTopCategories(int limit) {
        List<Object[]> results = listingRepository.findTopCategories();
        List<AdminStatsResponse.CategoryStats> categoryStats = new ArrayList<>();

        for (int i = 0; i < Math.min(results.size(), limit); i++) {
            Object[] row = results.get(i);
            String category = (String) row[0];
            Long bookingCount = ((Number) row[1]).longValue();

            // Get listing count for this category
            Long listingCount = listingRepository.countListingsByCategory(ListingStatus.APPROVED)
                    .stream()
                    .filter(r -> category.equals(r[0]))
                    .map(r -> ((Number) r[1]).longValue())
                    .findFirst()
                    .orElse(0L);

            categoryStats.add(new AdminStatsResponse.CategoryStats(category, bookingCount, listingCount));
        }

        return categoryStats;
    }

    @Override
    public List<AdminStatsResponse.ServiceStats> getTopServices(int limit) {
        List<Object[]> results = listingRepository.findTopServices();
        List<AdminStatsResponse.ServiceStats> serviceStats = new ArrayList<>();

        for (int i = 0; i < Math.min(results.size(), limit); i++) {
            Object[] row = results.get(i);
            Long listingId = ((Number) row[0]).longValue();
            String serviceName = (String) row[1];
            String providerName = (String) row[2];
            String category = (String) row[3];
            Long bookingCount = ((Number) row[4]).longValue();

            // Get average rating for this listing
            Double avgRating = reviewRepository.getAverageRatingForListing(listingId);

            serviceStats.add(new AdminStatsResponse.ServiceStats(
                    listingId, serviceName, providerName, category,
                    bookingCount, avgRating != null ? avgRating : 0.0
            ));
        }

        return serviceStats;
    }

    // Update the getRevenueStatistics() method in AdminServiceImpl.java:

    @Override
    public Map<String, Double> getRevenueStatistics() {
        Map<String, Double> revenueStats = new LinkedHashMap<>();

        try {
            System.out.println("=== REVENUE STATISTICS DEBUG ===");

            // 1. Get ALL completed bookings
            List<Booking> completedBookingList = bookingRepository.findByStatus(BookingStatus.COMPLETED);

            // 2. Calculate total revenue PROPERLY
            double totalRevenue = 0.0;
            int countWithTotalAmount = 0;
            int countWithListingPrice = 0;

            for (Booking b : completedBookingList) {
                Double amount = b.getTotalAmount();

                if (amount != null && amount > 0) {
                    totalRevenue += amount;
                    countWithTotalAmount++;
                    System.out.println("Booking " + b.getId() + ": Using total_amount=" + amount);
                } else if (b.getListing() != null && b.getListing().getPrice() != null) {
                    totalRevenue += b.getListing().getPrice();
                    countWithListingPrice++;
                    System.out.println("Booking " + b.getId() + ": Using listing price=" + b.getListing().getPrice());
                } else {
                    System.out.println("Booking " + b.getId() + ": No amount available");
                }
            }

            System.out.println("Total Revenue: " + totalRevenue);
            System.out.println("Using total_amount: " + countWithTotalAmount + " bookings");
            System.out.println("Using listing price: " + countWithListingPrice + " bookings");

            // 3. Date ranges (FIXED: Current date is 2026-01-17)
            LocalDateTime now = LocalDateTime.of(2026, 1, 17, 23, 59, 59); // Use your actual current date
            LocalDateTime startOfMonth = LocalDateTime.of(2026, 1, 1, 0, 0, 0); // Jan 1, 2026
            LocalDateTime endOfMonth = LocalDateTime.of(2026, 1, 31, 23, 59, 59); // Jan 31, 2026

            LocalDateTime weekAgo = LocalDateTime.of(2026, 1, 10, 0, 0, 0); // Jan 10, 2026

            System.out.println("Current date: " + now);
            System.out.println("Month range: " + startOfMonth + " to " + endOfMonth);
            System.out.println("Week range: " + weekAgo + " to " + now);

            // 4. Calculate monthly revenue (Jan 2026 bookings only)
            double monthlyRevenue = 0.0;
            int monthlyCount = 0;

            for (Booking b : completedBookingList) {
                LocalDateTime bookingDate = b.getBookingDateTime();
                if (bookingDate == null) continue;

                if (!bookingDate.isBefore(startOfMonth) && !bookingDate.isAfter(endOfMonth)) {
                    Double amount = b.getTotalAmount();
                    if (amount != null && amount > 0) {
                        monthlyRevenue += amount;
                    } else if (b.getListing() != null && b.getListing().getPrice() != null) {
                        monthlyRevenue += b.getListing().getPrice();
                    }
                    monthlyCount++;
                    System.out.println("Monthly Booking " + b.getId() + ": Date=" + bookingDate + ", Amount added");
                }
            }

            System.out.println("Monthly Revenue (Jan 2026): " + monthlyRevenue + " from " + monthlyCount + " bookings");

            // 5. Calculate weekly revenue (Jan 10-17, 2026)
            double weeklyRevenue = 0.0;
            int weeklyCount = 0;

            for (Booking b : completedBookingList) {
                LocalDateTime bookingDate = b.getBookingDateTime();
                if (bookingDate == null) continue;

                if (!bookingDate.isBefore(weekAgo) && !bookingDate.isAfter(now)) {
                    Double amount = b.getTotalAmount();
                    if (amount != null && amount > 0) {
                        weeklyRevenue += amount;
                    } else if (b.getListing() != null && b.getListing().getPrice() != null) {
                        weeklyRevenue += b.getListing().getPrice();
                    }
                    weeklyCount++;
                    System.out.println("Weekly Booking " + b.getId() + ": Date=" + bookingDate + ", Amount added");
                }
            }

            System.out.println("Weekly Revenue (Jan 10-17): " + weeklyRevenue + " from " + weeklyCount + " bookings");

            // 6. Get counts
            Long totalBookings = bookingRepository.count();
            Long completedBookings = (long) completedBookingList.size();
            Long pendingBookings = bookingRepository.countByStatus(BookingStatus.PENDING);
            Long cancelledBookings = bookingRepository.countByStatus(BookingStatus.CANCELLED);

            // 7. Other calculations
            double avgBookingValue = completedBookings > 0 ? totalRevenue / completedBookings : 0.0;
            double conversionRate = totalBookings > 0 ? (completedBookings.doubleValue() / totalBookings.doubleValue()) * 100 : 0.0;

            Long totalUsers = userRepository.count();
            double avgRevenuePerUser = totalUsers > 0 ? totalRevenue / totalUsers.doubleValue() : 0.0;

            // 8. Populate the map
            revenueStats.put("totalRevenue", totalRevenue);
            revenueStats.put("averageBookingValue", avgBookingValue);
            revenueStats.put("monthlyRevenue", monthlyRevenue);
            revenueStats.put("weeklyRevenue", weeklyRevenue);
            revenueStats.put("totalBookings", totalBookings != null ? totalBookings.doubleValue() : 0.0);
            revenueStats.put("completedBookings", completedBookings.doubleValue());
            revenueStats.put("pendingBookings", pendingBookings != null ? pendingBookings.doubleValue() : 0.0);
            revenueStats.put("cancelledBookings", cancelledBookings != null ? cancelledBookings.doubleValue() : 0.0);
            revenueStats.put("conversionRate", conversionRate);
            revenueStats.put("avgRevenuePerUser", avgRevenuePerUser);

            System.out.println("=== FINAL RESULTS ===");
            System.out.println("Total Revenue: ₹" + totalRevenue);
            System.out.println("Monthly Revenue (Jan): ₹" + monthlyRevenue);
            System.out.println("Weekly Revenue (Jan 10-17): ₹" + weeklyRevenue);
            System.out.println("Avg Booking Value: ₹" + avgBookingValue);

        } catch (Exception e) {
            System.err.println("ERROR: " + e.getMessage());
            e.printStackTrace();

            // Set defaults
            revenueStats.put("totalRevenue", 0.0);
            revenueStats.put("averageBookingValue", 0.0);
            revenueStats.put("monthlyRevenue", 0.0);
            revenueStats.put("weeklyRevenue", 0.0);
            revenueStats.put("totalBookings", 0.0);
            revenueStats.put("completedBookings", 0.0);
            revenueStats.put("pendingBookings", 0.0);
            revenueStats.put("cancelledBookings", 0.0);
            revenueStats.put("conversionRate", 0.0);
            revenueStats.put("avgRevenuePerUser", 0.0);
        }
        // ADD THIS DEBUG
        System.out.println("=== RETURNING TO FRONTEND ===");
        System.out.println("Returning totalRevenue: " + revenueStats.get("totalRevenue"));
        System.out.println("Returning monthlyRevenue: " + revenueStats.get("monthlyRevenue"));
        System.out.println("Returning weeklyRevenue: " + revenueStats.get("weeklyRevenue"));
        System.out.println("=== END RETURN VALUES ===");

        return revenueStats;
    }

    // Helper method to calculate last month's revenue
    private double calculateLastMonthRevenue() {
        try {
            LocalDateTime now = LocalDateTime.now();
            LocalDateTime startOfLastMonth = now.minusMonths(1).withDayOfMonth(1)
                    .withHour(0).withMinute(0).withSecond(0);
            LocalDateTime endOfLastMonth = startOfLastMonth.withDayOfMonth(
                            startOfLastMonth.toLocalDate().lengthOfMonth())
                    .withHour(23).withMinute(59).withSecond(59);

            List<Booking> lastMonthBookings = bookingRepository.findByCreatedAtBetween(
                    startOfLastMonth, endOfLastMonth);

            return lastMonthBookings.stream()
                    .filter(b -> b.getStatus() == BookingStatus.COMPLETED)
                    .mapToDouble(b -> {
                        if (b.getTotalAmount() != null) return b.getTotalAmount();
                        if (b.getListing() != null && b.getListing().getPrice() != null)
                            return b.getListing().getPrice();
                        return 0.0;
                    })
                    .sum();
        } catch (Exception e) {
            return 0.0;
        }
    }

    @Override
    public Map<String, Long> getDailyBookingsLast7Days() {
        LocalDateTime sevenDaysAgo = LocalDateTime.now().minusDays(7);

        // Use the repository method
        List<Object[]> results = bookingRepository.findDailyBookingsSince(sevenDaysAgo);

        Map<String, Long> dailyBookings = new LinkedHashMap<>();

        // Initialize last 7 days
        for (int i = 6; i >= 0; i--) {
            LocalDate date = LocalDate.now().minusDays(i);
            dailyBookings.put(date.toString(), 0L);
        }

        // Fill with actual data
        for (Object[] row : results) {
            String dateStr = row[0].toString(); // Date as string
            Long count = ((Number) row[1]).longValue();
            dailyBookings.put(dateStr, count);
        }

        return dailyBookings;
    }

    @Override
    public Map<String, Long> getCategoryDistribution() {
        // Use the new repository method
        List<Object[]> results = bookingRepository.findBookingCountByCategory();

        Map<String, Long> distribution = new LinkedHashMap<>();

        for (Object[] row : results) {
            String category = (String) row[0];
            Long count = ((Number) row[1]).longValue();
            distribution.put(category, count);
        }

        return distribution;
    }

    @Override
    public Map<String, Long> getUserStatistics() {
        Map<String, Long> stats = new LinkedHashMap<>();

        try {
            List<User> allUsers = userRepository.findAll();

            // Basic counts
            stats.put("totalUsers", (long) allUsers.size());

            // Count by role using repository method if available, otherwise manual count
            Long customerCount = userRepository.countByRole("CUSTOMER");
            if (customerCount != null) {
                stats.put("customers", customerCount);
            } else {
                stats.put("customers", allUsers.stream()
                        .filter(u -> "CUSTOMER".equals(u.getRole())).count());
            }

            Long providerCount = userRepository.countByRole("PROVIDER");
            if (providerCount != null) {
                stats.put("providers", providerCount);
            } else {
                stats.put("providers", allUsers.stream()
                        .filter(u -> "PROVIDER".equals(u.getRole())).count());
            }

            Long adminCount = userRepository.countByRole("ADMIN");
            if (adminCount != null) {
                stats.put("admins", adminCount);
            } else {
                stats.put("admins", allUsers.stream()
                        .filter(u -> "ADMIN".equals(u.getRole())).count());
            }

            // New users this month
            LocalDateTime startOfMonth = LocalDateTime.now().withDayOfMonth(1)
                    .withHour(0).withMinute(0).withSecond(0);
            long newUsersThisMonth = allUsers.stream()
                    .filter(u -> u.getCreatedAt() != null &&
                            !u.getCreatedAt().isBefore(startOfMonth))
                    .count();
            stats.put("newUsersThisMonth", newUsersThisMonth);


            // User growth (new users last month vs this month)
            LocalDateTime startOfLastMonth = startOfMonth.minusMonths(1);
            LocalDateTime endOfLastMonth = startOfLastMonth.withDayOfMonth(
                            startOfLastMonth.toLocalDate().lengthOfMonth())
                    .withHour(23).withMinute(59).withSecond(59);

            long newUsersLastMonth = allUsers.stream()
                    .filter(u -> u.getCreatedAt() != null &&
                            !u.getCreatedAt().isBefore(startOfLastMonth) &&
                            !u.getCreatedAt().isAfter(endOfLastMonth))
                    .count();
            stats.put("newUsersLastMonth", newUsersLastMonth);

            // Calculate growth percentage for frontend if needed
            double growthPercentage = newUsersLastMonth > 0 ?
                    ((double) (newUsersThisMonth - newUsersLastMonth) / newUsersLastMonth) * 100 :
                    newUsersThisMonth > 0 ? 100.0 : 0.0;

            // You can add this to stats map as well if needed
            stats.put("userGrowth", Math.round(growthPercentage));

        } catch (Exception e) {
            // Default values
            stats.put("totalUsers", 0L);
            stats.put("customers", 0L);
            stats.put("providers", 0L);
            stats.put("admins", 0L);
            stats.put("activeUsers", 0L);
            stats.put("newUsersThisMonth", 0L);
            stats.put("verifiedUsers", 0L);
            stats.put("newUsersLastMonth", 0L);
            stats.put("userGrowth", 0L);

            System.err.println("Error calculating user statistics: " + e.getMessage());
        }

        return stats;
    }

    // ==================== NEW PROVIDER METHODS ====================

    @Override
    public List<ProviderStatsResponse> getAllProvidersWithStats() {
        List<User> providers = userRepository.findAll().stream()
                .filter(user -> "PROVIDER".equals(user.getRole()))
                .collect(Collectors.toList());

        return providers.stream()
                .map(this::convertToProviderStatsResponse)
                .collect(Collectors.toList());
    }

    @Override
    public ProviderStatsResponse getProviderStats(Long providerId) {
        User provider = userRepository.findById(providerId)
                .orElseThrow(() -> new RuntimeException("Provider not found with ID: " + providerId));

        return convertToProviderStatsResponse(provider);
    }

    private ProviderStatsResponse convertToProviderStatsResponse(User provider) {
        List<Listing> providerListings = listingRepository.findByProviderId(provider.getId());

        // Get most common location from listings
        String primaryLocation = providerListings.stream()
                .filter(listing -> listing.getLocation() != null)
                .collect(Collectors.groupingBy(Listing::getLocation, Collectors.counting()))
                .entrySet()
                .stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse("Not specified"); // Default value

        // Get listings count - Need to add custom query since Listing uses provider, not userId
        Long totalListings = listingRepository.countByProviderId(provider.getId());

        // Get bookings for this provider
        List<Booking> bookings = bookingRepository.findByProviderId(provider.getId());
        Long totalBookings = (long) bookings.size();

        Long completedBookings = bookings.stream()
                .filter(b -> b.getStatus() == BookingStatus.COMPLETED)
                .count();

        Long pendingBookings = bookings.stream()
                .filter(b -> b.getStatus() == BookingStatus.PENDING)
                .count();

        // Get reviews and calculate average rating
        List<Review> reviews = reviewRepository.findByProviderId(provider.getId());
        double avgRating = reviews.stream()
                .mapToInt(Review::getRating)
                .average()
                .orElse(0.0);

        // Calculate total revenue from completed bookings - use totalAmount field
        double totalRevenue = bookings.stream()
                .filter(b -> b.getStatus() == BookingStatus.COMPLETED)
                .mapToDouble(b -> b.getTotalAmount() != null ? b.getTotalAmount() : 0.0)
                .sum();

        // Calculate response rate (simplified: completed/total bookings * 100)
        int responseRate = totalBookings > 0 ?
                (int) ((completedBookings * 100) / totalBookings) : 0;

        // For User model, you don't have location and createdAt fields yet
        // You'll need to add these to your User model or adjust the DTO
        return new ProviderStatsResponse(
                provider.getId(),
                provider.getUsername(),
                provider.getEmail(),
                primaryLocation,
                LocalDateTime.now(),
                totalListings.intValue(),
                totalBookings.intValue(),
                completedBookings.intValue(),
                pendingBookings.intValue(),
                avgRating,
                totalRevenue,
                responseRate
        );
    }

    @Override
    public List<ProviderReviewResponse> getProviderReviews(Long providerId) {
        List<Review> reviews = reviewRepository.findByProviderId(providerId);

        return reviews.stream()
                .map(this::convertToProviderReviewResponse)
                .collect(Collectors.toList());
    }

    private ProviderReviewResponse convertToProviderReviewResponse(Review review) {
        String userName = review.getCustomer() != null ?
                review.getCustomer().getUsername() : "Customer";

        Long bookingId = null;
        Long listingId = null;

        if (review.getBooking() != null) {
            bookingId = review.getBooking().getId();
        }

        if (review.getListing() != null) {
            listingId = review.getListing().getId();
        }

        return new ProviderReviewResponse(
                review.getId(),
                userName,
                review.getRating(),
                review.getComment(),
                review.getCreatedAt(),
                bookingId,
                listingId
        );
    }

    @Override
    public List<ProviderListingResponse> getProviderListings(Long providerId) {
        List<Listing> listings = listingRepository.findByProviderId(providerId);

        return listings.stream()
                .map(this::convertToProviderListingResponse)
                .collect(Collectors.toList());
    }

    private ProviderListingResponse convertToProviderListingResponse(Listing listing) {
        // Get booking count for this listing - Need to add custom query
        Long bookingCount = bookingRepository.countByListingId(listing.getId());

        // Get average rating for this listing
        List<Review> listingReviews = reviewRepository.findByListingId(listing.getId());
        double averageRating = listingReviews.stream()
                .mapToInt(Review::getRating)
                .average()
                .orElse(0.0);

        return new ProviderListingResponse(
                listing.getId(),
                listing.getServiceName(),
                listing.getDescription(),
                listing.getCategory(),
                listing.getPrice(),
                listing.getStatus().name(),
                listing.getIsAvailable(),
                listing.getCreatedAt(),
                bookingCount.intValue(),
                averageRating
        );
    }

    @Override
    public List<ProviderStatsResponse> searchProviders(String keyword, String location) {
        List<User> providers = userRepository.findAll().stream()
                .filter(user -> "PROVIDER".equals(user.getRole()))
                .collect(Collectors.toList());

        // Apply search filters
        if (keyword != null && !keyword.isEmpty()) {
            String lowerKeyword = keyword.toLowerCase();
            providers = providers.stream()
                    .filter(provider ->
                            (provider.getUsername() != null && provider.getUsername().toLowerCase().contains(lowerKeyword)) ||
                                    (provider.getEmail() != null && provider.getEmail().toLowerCase().contains(lowerKeyword))
                    )
                    .collect(Collectors.toList());
        }

        // Note: Your User model doesn't have location field yet
        // You'll need to add location field to User model for this to work
        /*
        if (location != null && !location.isEmpty()) {
            String lowerLocation = location.toLowerCase();
            providers = providers.stream()
                    .filter(provider ->
                        provider.getLocation() != null &&
                        provider.getLocation().toLowerCase().contains(lowerLocation)
                    )
                    .collect(Collectors.toList());
        }
        */

        return providers.stream()
                .map(this::convertToProviderStatsResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void updateProviderStatus(Long providerId, String status) {
        User provider = userRepository.findById(providerId)
                .orElseThrow(() -> new RuntimeException("Provider not found with ID: " + providerId));

        // For now, just throw exception or implement if you have the field
        throw new RuntimeException("Provider status update not implemented yet. Add status field to User entity.");
    }


}