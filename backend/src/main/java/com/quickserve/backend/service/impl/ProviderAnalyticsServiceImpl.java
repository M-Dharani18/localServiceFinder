package com.quickserve.backend.service.impl;

import com.quickserve.backend.dto.ProviderAnalyticsResponse;
import com.quickserve.backend.model.*;
import com.quickserve.backend.repository.*;
import com.quickserve.backend.service.ProviderAnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class ProviderAnalyticsServiceImpl implements ProviderAnalyticsService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private ListingRepository listingRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public ProviderAnalyticsResponse getProviderAnalytics(Long providerId) {
        // Verify provider exists
        User provider = userRepository.findById(providerId)
                .orElseThrow(() -> new RuntimeException("Provider not found with ID: " + providerId));

        if (!"PROVIDER".equals(provider.getRole())) {
            throw new RuntimeException("User is not a provider");
        }

        ProviderAnalyticsResponse response = new ProviderAnalyticsResponse();

        // Get all bookings for this provider
        List<Booking> allBookings = bookingRepository.findByProviderId(providerId);

        // 1. Calculate booking statistics by status
        response.setTotalBookings((long) allBookings.size());
        response.setPendingBookings(
                allBookings.stream()
                        .filter(b -> b.getStatus() == BookingStatus.PENDING)
                        .count()
        );
        response.setConfirmedBookings(
                allBookings.stream()
                        .filter(b -> b.getStatus() == BookingStatus.CONFIRMED)
                        .count()
        );
        response.setCompletedBookings(
                allBookings.stream()
                        .filter(b -> b.getStatus() == BookingStatus.COMPLETED)
                        .count()
        );
        response.setCancelledBookings(
                allBookings.stream()
                        .filter(b -> b.getStatus() == BookingStatus.CANCELLED)
                        .count()
        );

        // 2. Calculate total revenue (completed bookings only)
        double totalRevenue = allBookings.stream()
                .filter(b -> b.getStatus() == BookingStatus.COMPLETED)
                .mapToDouble(b -> {
                    if (b.getTotalAmount() != null && b.getTotalAmount() > 0) {
                        return b.getTotalAmount();
                    } else if (b.getListing() != null && b.getListing().getPrice() != null) {
                        return b.getListing().getPrice();
                    }
                    return 0.0;
                })
                .sum();
        response.setTotalRevenue(totalRevenue);

        // 3. Calculate monthly revenue (current month)
        LocalDateTime startOfMonth = LocalDateTime.now()
                .withDayOfMonth(1)
                .withHour(0)
                .withMinute(0)
                .withSecond(0);

        double monthlyRevenue = allBookings.stream()
                .filter(b -> b.getStatus() == BookingStatus.COMPLETED)
                .filter(b -> b.getCreatedAt() != null && !b.getCreatedAt().isBefore(startOfMonth))
                .mapToDouble(b -> b.getTotalAmount() != null ? b.getTotalAmount() : 0.0)
                .sum();
        response.setMonthlyRevenue(monthlyRevenue);

        // 4. Calculate weekly revenue (last 7 days)
        LocalDateTime weekAgo = LocalDateTime.now().minusDays(7);
        double weeklyRevenue = allBookings.stream()
                .filter(b -> b.getStatus() == BookingStatus.COMPLETED)
                .filter(b -> b.getCreatedAt() != null && !b.getCreatedAt().isBefore(weekAgo))
                .mapToDouble(b -> b.getTotalAmount() != null ? b.getTotalAmount() : 0.0)
                .sum();
        response.setWeeklyRevenue(weeklyRevenue);

        // 5. Get reviews and calculate average rating
        List<Review> reviews = reviewRepository.findByProviderId(providerId);
        response.setTotalReviews((long) reviews.size());

        double averageRating = reviews.stream()
                .mapToDouble(Review::getRating)
                .average()
                .orElse(0.0);
        response.setAverageRating(Math.round(averageRating * 100.0) / 100.0);

        // 6. Get listing counts
        List<Listing> allListings = listingRepository.findByProviderId(providerId);
        response.setTotalListings(allListings.size());
        response.setActiveListings(
                (int) allListings.stream()
                        .filter(l -> l.getIsAvailable() && l.getStatus() == ListingStatus.APPROVED)
                        .count()
        );

        // 7. Monthly bookings trend (last 6 months)
        response.setMonthlyBookings(calculateMonthlyBookings(allBookings));

        // 8. Category breakdown
        response.setCategoryBreakdown(calculateCategoryBreakdown(allBookings));

        // 9. Recent bookings (last 10)
        response.setRecentBookings(getRecentBookings(allBookings));

        return response;
    }

    private List<ProviderAnalyticsResponse.MonthlyBooking> calculateMonthlyBookings(List<Booking> bookings) {
        Map<String, ProviderAnalyticsResponse.MonthlyBooking> monthlyMap = new LinkedHashMap<>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMM yyyy");

        // Initialize last 6 months
        for (int i = 5; i >= 0; i--) {
            LocalDateTime date = LocalDateTime.now().minusMonths(i);
            String monthKey = date.format(formatter);
            monthlyMap.put(monthKey, new ProviderAnalyticsResponse.MonthlyBooking(monthKey, 0L, 0.0));
        }

        // Group bookings by month
        bookings.stream()
                .filter(b -> b.getBookingDateTime() != null)
                .filter(b -> b.getBookingDateTime().isAfter(LocalDateTime.now().minusMonths(6)))
                .forEach(booking -> {
                    String monthKey = booking.getBookingDateTime().format(formatter);
                    if (monthlyMap.containsKey(monthKey)) {
                        ProviderAnalyticsResponse.MonthlyBooking mb = monthlyMap.get(monthKey);
                        mb.setBookings(mb.getBookings() + 1);

                        if (booking.getStatus() == BookingStatus.COMPLETED) {
                            double amount = booking.getTotalAmount() != null ? booking.getTotalAmount() : 0.0;
                            mb.setRevenue(mb.getRevenue() + amount);
                        }
                    }
                });

        return new ArrayList<>(monthlyMap.values());
    }

    private List<ProviderAnalyticsResponse.CategoryBreakdown> calculateCategoryBreakdown(List<Booking> bookings) {
        Map<String, ProviderAnalyticsResponse.CategoryBreakdown> categoryMap = new HashMap<>();

        bookings.forEach(booking -> {
            if (booking.getListing() != null && booking.getListing().getCategory() != null) {
                String category = booking.getListing().getCategory();

                categoryMap.putIfAbsent(category,
                        new ProviderAnalyticsResponse.CategoryBreakdown(category, 0L, 0.0));

                ProviderAnalyticsResponse.CategoryBreakdown cb = categoryMap.get(category);
                cb.setCount(cb.getCount() + 1);

                if (booking.getStatus() == BookingStatus.COMPLETED && booking.getTotalAmount() != null) {
                    cb.setRevenue(cb.getRevenue() + booking.getTotalAmount());
                }
            }
        });

        return new ArrayList<>(categoryMap.values());
    }

    private List<ProviderAnalyticsResponse.RecentBooking> getRecentBookings(List<Booking> bookings) {
        return bookings.stream()
                .sorted(Comparator.comparing(Booking::getCreatedAt).reversed())
                .limit(10)
                .map(booking -> {
                    String customerName = "Unknown Customer";
                    if (booking.getCustomer() != null && booking.getCustomer().getUsername() != null) {
                        customerName = booking.getCustomer().getUsername();
                    } else if (booking.getCustomer() != null && booking.getCustomer().getId() != null) {
                        customerName = "Customer #" + booking.getCustomer().getId();
                    }

                    String serviceName = "Unknown Service";
                    if (booking.getListing() != null && booking.getListing().getServiceName() != null) {
                        serviceName = booking.getListing().getServiceName();
                    } else if (booking.getListing() != null && booking.getListing().getId() != null) {
                        serviceName = "Service #" + booking.getListing().getId();
                    }

                    Double price = 0.0;
                    if (booking.getTotalAmount() != null && booking.getTotalAmount() > 0) {
                        price = booking.getTotalAmount();
                    } else if (booking.getListing() != null && booking.getListing().getPrice() != null) {
                        price = booking.getListing().getPrice();
                    }

                    return new ProviderAnalyticsResponse.RecentBooking(
                            booking.getId(),
                            customerName,
                            serviceName,
                            booking.getBookingDateTime(),
                            booking.getStatus().name(),
                            price
                    );
                })
                .collect(Collectors.toList());
    }
}
