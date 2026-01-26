////package com.quickserve.backend.repository;
////
////import com.quickserve.backend.model.Booking;
////import com.quickserve.backend.model.BookingStatus;
////import org.springframework.data.jpa.repository.JpaRepository;
////import org.springframework.data.jpa.repository.Query;
////import org.springframework.data.repository.query.Param;
////import org.springframework.stereotype.Repository;
////
////import java.time.LocalDateTime;
////import java.util.List;
////import java.util.Optional;
////
////@Repository
////public interface BookingRepository extends JpaRepository<Booking, Long> {
////
////    // Find all bookings by customer
////    List<Booking> findByCustomerId(Long customerId);
////
////    // Find all bookings by provider
////    List<Booking> findByProviderId(Long providerId);
////
////    // Find bookings by status for a customer
////    List<Booking> findByCustomerIdAndStatus(Long customerId, BookingStatus status);
////
////    // Find bookings by status for a provider
////    List<Booking> findByProviderIdAndStatus(Long providerId, BookingStatus status);
////
////    // OLD: Check if a slot is already booked (EXACT time match - problematic)
////    @Query("SELECT COUNT(b) > 0 FROM Booking b WHERE b.provider.id = :providerId " +
////            "AND b.listing.id = :listingId AND b.bookingDateTime = :dateTime " +
////            "AND b.status IN ('PENDING', 'CONFIRMED')")
////    boolean existsByProviderAndListingAndDateTime(
////            @Param("providerId") Long providerId,
////            @Param("listingId") Long listingId,
////            @Param("dateTime") LocalDateTime dateTime
////    );
////
////    // NEW: Check if there's an overlapping booking (1-hour duration)
////    @Query("SELECT COUNT(b) > 0 FROM Booking b WHERE b.provider.id = :providerId " +
////            "AND b.listing.id = :listingId " +
////            "AND b.status IN ('PENDING', 'CONFIRMED') " +
////            "AND (" +
////            "   (b.bookingDateTime <= :startTime AND FUNCTION('TIMESTAMPADD', MINUTE, 60, b.bookingDateTime) > :startTime) " + // New booking starts during existing
////            "   OR (b.bookingDateTime >= :startTime AND b.bookingDateTime < FUNCTION('TIMESTAMPADD', MINUTE, 60, :startTime)) " + // Existing starts during new
////            "   OR (b.bookingDateTime = :startTime)" + // Exact same time
////            ")")
////    boolean existsOverlappingBooking(
////            @Param("providerId") Long providerId,
////            @Param("listingId") Long listingId,
////            @Param("startTime") LocalDateTime startTime
////    );
////
////    // NEW: Find overlapping bookings (returns list for debugging)
////    @Query("SELECT b FROM Booking b WHERE b.provider.id = :providerId " +
////            "AND b.listing.id = :listingId " +
////            "AND b.status IN ('PENDING', 'CONFIRMED') " +
////            "AND (" +
////            "   (b.bookingDateTime <= :startTime AND FUNCTION('TIMESTAMPADD', MINUTE, 60, b.bookingDateTime) > :startTime) " +
////            "   OR (b.bookingDateTime >= :startTime AND b.bookingDateTime < FUNCTION('TIMESTAMPADD', MINUTE, 60, :startTime)) " +
////            "   OR (b.bookingDateTime = :startTime)" +
////            ")")
////    List<Booking> findOverlappingBookings(
////            @Param("providerId") Long providerId,
////            @Param("listingId") Long listingId,
////            @Param("startTime") LocalDateTime startTime
////    );
////
////    // NEW: Check for booking within a specific time range
////    @Query("SELECT COUNT(b) > 0 FROM Booking b WHERE b.provider.id = :providerId " +
////            "AND b.listing.id = :listingId " +
////            "AND b.status IN ('PENDING', 'CONFIRMED') " +
////            "AND b.bookingDateTime BETWEEN :rangeStart AND :rangeEnd")
////    boolean existsBookingInTimeRange(
////            @Param("providerId") Long providerId,
////            @Param("listingId") Long listingId,
////            @Param("rangeStart") LocalDateTime rangeStart,
////            @Param("rangeEnd") LocalDateTime rangeEnd
////    );
////
////    // Get upcoming bookings for customer
////    @Query("SELECT b FROM Booking b WHERE b.customer.id = :customerId " +
////            "AND b.bookingDateTime >= :now ORDER BY b.bookingDateTime ASC")
////    List<Booking> findUpcomingBookingsByCustomer(
////            @Param("customerId") Long customerId,
////            @Param("now") LocalDateTime now
////    );
////
////    // Get past bookings for customer
////    @Query("SELECT b FROM Booking b WHERE b.customer.id = :customerId " +
////            "AND b.bookingDateTime < :now ORDER BY b.bookingDateTime DESC")
////    List<Booking> findPastBookingsByCustomer(
////            @Param("customerId") Long customerId,
////            @Param("now") LocalDateTime now
////    );
////
////    // Get upcoming bookings for provider
////    @Query("SELECT b FROM Booking b WHERE b.provider.id = :providerId " +
////            "AND b.bookingDateTime >= :now ORDER BY b.bookingDateTime ASC")
////    List<Booking> findUpcomingBookingsByProvider(
////            @Param("providerId") Long providerId,
////            @Param("now") LocalDateTime now
////    );
////
////    // Get past bookings for provider
////    @Query("SELECT b FROM Booking b WHERE b.provider.id = :providerId " +
////            "AND b.bookingDateTime < :now ORDER BY b.bookingDateTime DESC")
////    List<Booking> findPastBookingsByProvider(
////            @Param("providerId") Long providerId,
////            @Param("now") LocalDateTime now
////    );
////
////    // NEW: Find bookings for a provider on a specific date
////    @Query("SELECT b FROM Booking b WHERE b.provider.id = :providerId " +
////            "AND DATE(b.bookingDateTime) = DATE(:date) " +
////            "AND b.status IN ('PENDING', 'CONFIRMED') " +
////            "ORDER BY b.bookingDateTime ASC")
////    List<Booking> findProviderBookingsByDate(
////            @Param("providerId") Long providerId,
////            @Param("date") LocalDateTime date
////    );
////
////    // NEW: Find next available time slot (for suggestion)
////    @Query(value = "SELECT * FROM bookings b " +
////            "WHERE b.provider_id = :providerId " +
////            "AND b.listing_id = :listingId " +
////            "AND b.status IN ('PENDING', 'CONFIRMED') " +
////            "AND b.booking_date_time > :afterTime " +
////            "ORDER BY b.booking_date_time ASC " +
////            "LIMIT 1", nativeQuery = true)
////    Optional<Booking> findNextBookingAfter(
////            @Param("providerId") Long providerId,
////            @Param("listingId") Long listingId,
////            @Param("afterTime") LocalDateTime afterTime
////    );
////}
//
//package com.quickserve.backend.repository;
//
//import com.quickserve.backend.model.Booking;
//import com.quickserve.backend.model.BookingStatus;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;
//import org.springframework.stereotype.Repository;
//
//import java.time.LocalDateTime;
//import java.util.List;
//
//@Repository
//public interface BookingRepository extends JpaRepository<Booking, Long> {
//
//    // Find all bookings by customer
//    List<Booking> findByCustomerId(Long customerId);
//
//    // Find all bookings by provider
//    List<Booking> findByProviderId(Long providerId);
//
//    // Find bookings by status for a customer
//    List<Booking> findByCustomerIdAndStatus(Long customerId, BookingStatus status);
//
//    // Find bookings by status for a provider
//    List<Booking> findByProviderIdAndStatus(Long providerId, BookingStatus status);
//
//    // ⚠️ OLD METHOD - ONLY CHECKS EXACT TIME (PROBLEM!)
//    // This is the buggy method you're currently using
//    @Query("SELECT COUNT(b) > 0 FROM Booking b WHERE b.provider.id = :providerId " +
//            "AND b.listing.id = :listingId AND b.bookingDateTime = :dateTime " +
//            "AND b.status IN ('PENDING', 'CONFIRMED')")
//    boolean existsByProviderAndListingAndDateTime(
//            @Param("providerId") Long providerId,
//            @Param("listingId") Long listingId,
//            @Param("dateTime") LocalDateTime dateTime
//    );
//
//    // ✅ NEW METHOD - CHECKS FOR OVERLAPPING BOOKINGS (FIX!)
//    // This checks if there's any booking that overlaps with the requested time period
//    @Query("SELECT COUNT(b) > 0 FROM Booking b " +
//            "JOIN TimeSlot ts ON ts.listing.id = b.listing.id " +
//            "WHERE b.provider.id = :providerId " +
//            "AND b.listing.id = :listingId " +
//            "AND b.status IN ('PENDING', 'CONFIRMED') " +
//            "AND :bookingDateTime >= ts.startTime " +
//            "AND :bookingDateTime < ts.endTime " +
//            "AND b.bookingDateTime >= ts.startTime " +
//            "AND b.bookingDateTime < ts.endTime")
//    boolean hasOverlappingBooking(
//            @Param("providerId") Long providerId,
//            @Param("listingId") Long listingId,
//            @Param("bookingDateTime") LocalDateTime bookingDateTime
//    );
//
//    // ✅ ALTERNATIVE SIMPLE METHOD - Checks if slot time is already booked
//    // This assumes each time slot is one unit (e.g., 9:00-10:00)
//    @Query("SELECT COUNT(b) > 0 FROM Booking b " +
//            "WHERE b.provider.id = :providerId " +
//            "AND b.listing.id = :listingId " +
//            "AND b.bookingDateTime = :slotStartTime " +
//            "AND b.status IN ('PENDING', 'CONFIRMED')")
//    boolean isSlotAlreadyBooked(
//            @Param("providerId") Long providerId,
//            @Param("listingId") Long listingId,
//            @Param("slotStartTime") LocalDateTime slotStartTime
//    );
//
//    // Get upcoming bookings for customer
//    @Query("SELECT b FROM Booking b WHERE b.customer.id = :customerId " +
//            "AND b.bookingDateTime >= :now ORDER BY b.bookingDateTime ASC")
//    List<Booking> findUpcomingBookingsByCustomer(
//            @Param("customerId") Long customerId,
//            @Param("now") LocalDateTime now
//    );
//
//    // Get past bookings for customer
//    @Query("SELECT b FROM Booking b WHERE b.customer.id = :customerId " +
//            "AND b.bookingDateTime < :now ORDER BY b.bookingDateTime DESC")
//    List<Booking> findPastBookingsByCustomer(
//            @Param("customerId") Long customerId,
//            @Param("now") LocalDateTime now
//    );
//
//    // Get upcoming bookings for provider
//    @Query("SELECT b FROM Booking b WHERE b.provider.id = :providerId " +
//            "AND b.bookingDateTime >= :now ORDER BY b.bookingDateTime ASC")
//    List<Booking> findUpcomingBookingsByProvider(
//            @Param("providerId") Long providerId,
//            @Param("now") LocalDateTime now
//    );
//
//    // Get past bookings for provider
//    @Query("SELECT b FROM Booking b WHERE b.provider.id = :providerId " +
//            "AND b.bookingDateTime < :now ORDER BY b.bookingDateTime DESC")
//    List<Booking> findPastBookingsByProvider(
//            @Param("providerId") Long providerId,
//            @Param("now") LocalDateTime now
//    );
//    @Query("SELECT COALESCE(SUM(b.totalAmount), 0) FROM Booking b WHERE b.status = 'COMPLETED'")
//    Double calculateTotalRevenue();
//
//    @Query("SELECT COALESCE(AVG(b.totalAmount), 0) FROM Booking b WHERE b.status = 'COMPLETED'")
//    Double calculateAverageBookingValue();
//
//    @Query("SELECT COALESCE(SUM(b.totalAmount), 0) FROM Booking b WHERE b.status = 'COMPLETED' " +
//            "AND MONTH(b.createdAt) = MONTH(CURRENT_DATE()) AND YEAR(b.createdAt) = YEAR(CURRENT_DATE())")
//    Double calculateMonthlyRevenue();
//
//    @Query("SELECT COALESCE(SUM(b.totalAmount), 0) FROM Booking b WHERE b.status = 'COMPLETED' " +
//            "AND b.createdAt >= DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY)")
//    Double calculateWeeklyRevenue();
//
//    // If this doesn't exist:
//    @Query("SELECT DATE(b.createdAt) as date, COUNT(b) as count FROM Booking b " +
//            "WHERE b.createdAt >= :since GROUP BY DATE(b.createdAt)")
//    List<Object[]> findDailyBookingsSince(@Param("since") LocalDateTime since);
//}

//
//
//package com.quickserve.backend.repository;
//
//import com.quickserve.backend.model.Booking;
//import com.quickserve.backend.model.BookingStatus;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;
//import org.springframework.stereotype.Repository;
//
//import java.time.LocalDateTime;
//import java.util.List;
//
//@Repository
//public interface BookingRepository extends JpaRepository<Booking, Long> {
//
//    // Find all bookings by customer
//    List<Booking> findByCustomerId(Long customerId);
//
//    // Find all bookings by provider
//    List<Booking> findByProviderId(Long providerId);
//
//    // Find bookings by status for a customer
//    List<Booking> findByCustomerIdAndStatus(Long customerId, BookingStatus status);
//
//    // Find bookings by status for a provider
//    List<Booking> findByProviderIdAndStatus(Long providerId, BookingStatus status);
//
//    // Check exact time slot
//    @Query("SELECT COUNT(b) > 0 FROM Booking b WHERE b.provider.id = :providerId " +
//            "AND b.listing.id = :listingId AND b.bookingDateTime = :dateTime " +
//            "AND b.status IN ('PENDING', 'CONFIRMED')")
//    boolean existsByProviderAndListingAndDateTime(
//            @Param("providerId") Long providerId,
//            @Param("listingId") Long listingId,
//            @Param("dateTime") LocalDateTime dateTime
//    );
//
//    // Get upcoming bookings for customer
//    @Query("SELECT b FROM Booking b WHERE b.customer.id = :customerId " +
//            "AND b.bookingDateTime >= :now ORDER BY b.bookingDateTime ASC")
//    List<Booking> findUpcomingBookingsByCustomer(
//            @Param("customerId") Long customerId,
//            @Param("now") LocalDateTime now
//    );
//
//    // Get past bookings for customer
//    @Query("SELECT b FROM Booking b WHERE b.customer.id = :customerId " +
//            "AND b.bookingDateTime < :now ORDER BY b.bookingDateTime DESC")
//    List<Booking> findPastBookingsByCustomer(
//            @Param("customerId") Long customerId,
//            @Param("now") LocalDateTime now
//    );
//
//    // Get upcoming bookings for provider
//    @Query("SELECT b FROM Booking b WHERE b.provider.id = :providerId " +
//            "AND b.bookingDateTime >= :now ORDER BY b.bookingDateTime ASC")
//    List<Booking> findUpcomingBookingsByProvider(
//            @Param("providerId") Long providerId,
//            @Param("now") LocalDateTime now
//    );
//
//    // Get past bookings for provider
//    @Query("SELECT b FROM Booking b WHERE b.provider.id = :providerId " +
//            "AND b.bookingDateTime < :now ORDER BY b.bookingDateTime DESC")
//    List<Booking> findPastBookingsByProvider(
//            @Param("providerId") Long providerId,
//            @Param("now") LocalDateTime now
//    );
//
//    // ==================== ADMIN STATISTICS METHODS ====================
//
//    // ✅ FIXED: Total revenue
//    @Query("SELECT COALESCE(SUM(b.totalAmount), 0.0) FROM Booking b WHERE b.status = 'COMPLETED'")
//    Double calculateTotalRevenue();
//
//    // ✅ FIXED: Average booking value
//    @Query("SELECT COALESCE(AVG(b.totalAmount), 0.0) FROM Booking b WHERE b.status = 'COMPLETED'")
//    Double calculateAverageBookingValue();
//
//    // ✅ FIXED: Current month revenue (HQL compatible)
//    @Query("SELECT COALESCE(SUM(b.totalAmount), 0.0) FROM Booking b " +
//            "WHERE b.status = 'COMPLETED' " +
//            "AND MONTH(b.createdAt) = MONTH(CURRENT_DATE) " +
//            "AND YEAR(b.createdAt) = YEAR(CURRENT_DATE)")
//    Double calculateMonthlyRevenue();
//
//    // ✅ FIXED: Weekly revenue with parameter (HQL compatible)
//    @Query("SELECT COALESCE(SUM(b.totalAmount), 0.0) FROM Booking b " +
//            "WHERE b.status = 'COMPLETED' " +
//            "AND b.createdAt >= :weekStart")
//    Double calculateWeeklyRevenue(@Param("weekStart") LocalDateTime weekStart);
//
//    // ✅ Daily bookings for trend chart
//    @Query("SELECT FUNCTION('DATE', b.createdAt), COUNT(b) " +
//            "FROM Booking b " +
//            "WHERE b.createdAt >= :since " +
//            "GROUP BY FUNCTION('DATE', b.createdAt) " +
//            "ORDER BY FUNCTION('DATE', b.createdAt) ASC")
//    List<Object[]> findDailyBookingsSince(@Param("since") LocalDateTime since);
//
//    // ✅ Find bookings between dates
//    List<Booking> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end);
//
//    // ✅ Count bookings by status
//    Long countByStatus(BookingStatus status);
//
//    // ✅ Find bookings by status
//    List<Booking> findByStatus(BookingStatus status);
//
//    // ✅ Alternative: Native query for weekly revenue (if HQL doesn't work)
//    @Query(value = "SELECT COALESCE(SUM(b.total_amount), 0) FROM bookings b " +
//            "WHERE b.status = 'COMPLETED' " +
//            "AND b.created_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)",
//            nativeQuery = true)
//    Double calculateWeeklyRevenueNative();
//
//    // In BookingRepository.java - Add this method
//    @Query("SELECT l.category, COUNT(b) FROM Booking b " +
//            "JOIN b.listing l " +
//            "WHERE b.status = 'COMPLETED' " +
//            "GROUP BY l.category")
//    List<Object[]> findBookingCountByCategory();
//
//    // Count bookings by listing ID
//    @Query("SELECT COUNT(b) FROM Booking b WHERE b.listing.id = :listingId")
//    Long countByListingId(@Param("listingId") Long listingId);
//
//    // In BookingRepository.java, add these methods:
//
//    @Query("SELECT COALESCE(SUM(b.totalAmount), 0) FROM Booking b WHERE b.status = 'COMPLETED'")
//    Double calculateTotalRevenue();
//
//    @Query("SELECT COALESCE(AVG(b.totalAmount), 0) FROM Booking b WHERE b.status = 'COMPLETED'")
//    Double calculateAverageBookingValue();
//
//    @Query("SELECT COALESCE(SUM(b.totalAmount), 0) FROM Booking b WHERE b.status = 'COMPLETED' AND MONTH(b.createdAt) = MONTH(CURRENT_DATE) AND YEAR(b.createdAt) = YEAR(CURRENT_DATE)")
//    Double calculateMonthlyRevenue();
//
//    @Query("SELECT COALESCE(SUM(b.totalAmount), 0) FROM Booking b WHERE b.status = 'COMPLETED' AND b.createdAt >= :weekStart")
//    Double calculateWeeklyRevenue(@Param("weekStart") LocalDateTime weekStart);
//
//    @Query("SELECT DATE(b.createdAt) as date, COUNT(b) as count FROM Booking b WHERE b.createdAt >= :since GROUP BY DATE(b.createdAt) ORDER BY DATE(b.createdAt)")
//    List<Object[]> findDailyBookingsSince(@Param("since") LocalDateTime since);
//
//    @Query("SELECT l.category, COUNT(b) as count FROM Booking b JOIN b.listing l WHERE b.status = 'COMPLETED' GROUP BY l.category")
//    List<Object[]> findBookingCountByCategory();
//
//    @Query("SELECT COUNT(b) FROM Booking b WHERE b.status = 'COMPLETED' AND b.provider.id = :providerId")
//    Long countCompletedBookingsByProvider(@Param("providerId") Long providerId);
//
//    @Query("SELECT COUNT(b) FROM Booking b WHERE b.provider.id = :providerId")
//    Long countBookingsByProvider(@Param("providerId") Long providerId);
//}





package com.quickserve.backend.repository;

import com.quickserve.backend.model.Booking;
import com.quickserve.backend.model.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    // Find all bookings by customer
    List<Booking> findByCustomerId(Long customerId);

    // Find all bookings by provider
    List<Booking> findByProviderId(Long providerId);

    // Find bookings by status for a customer
    List<Booking> findByCustomerIdAndStatus(Long customerId, BookingStatus status);

    // Find bookings by status for a provider
    List<Booking> findByProviderIdAndStatus(Long providerId, BookingStatus status);

    // Check exact time slot
    @Query("SELECT COUNT(b) > 0 FROM Booking b WHERE b.provider.id = :providerId " +
            "AND b.listing.id = :listingId AND b.bookingDateTime = :dateTime " +
            "AND b.status IN ('PENDING', 'CONFIRMED')")
    boolean existsByProviderAndListingAndDateTime(
            @Param("providerId") Long providerId,
            @Param("listingId") Long listingId,
            @Param("dateTime") LocalDateTime dateTime
    );

    // Get upcoming bookings for customer
    @Query("SELECT b FROM Booking b WHERE b.customer.id = :customerId " +
            "AND b.bookingDateTime >= :now ORDER BY b.bookingDateTime ASC")
    List<Booking> findUpcomingBookingsByCustomer(
            @Param("customerId") Long customerId,
            @Param("now") LocalDateTime now
    );

    // Get past bookings for customer
    @Query("SELECT b FROM Booking b WHERE b.customer.id = :customerId " +
            "AND b.bookingDateTime < :now ORDER BY b.bookingDateTime DESC")
    List<Booking> findPastBookingsByCustomer(
            @Param("customerId") Long customerId,
            @Param("now") LocalDateTime now
    );

    // Get upcoming bookings for provider
    @Query("SELECT b FROM Booking b WHERE b.provider.id = :providerId " +
            "AND b.bookingDateTime >= :now ORDER BY b.bookingDateTime ASC")
    List<Booking> findUpcomingBookingsByProvider(
            @Param("providerId") Long providerId,
            @Param("now") LocalDateTime now
    );

    // Get past bookings for provider
    @Query("SELECT b FROM Booking b WHERE b.provider.id = :providerId " +
            "AND b.bookingDateTime < :now ORDER BY b.bookingDateTime DESC")
    List<Booking> findPastBookingsByProvider(
            @Param("providerId") Long providerId,
            @Param("now") LocalDateTime now
    );

    // ==================== ADMIN STATISTICS METHODS ====================

    // Total revenue
    @Query("SELECT COALESCE(SUM(b.totalAmount), 0.0) FROM Booking b WHERE b.status = 'COMPLETED'")
    Double calculateTotalRevenue();

    // Average booking value
    @Query("SELECT COALESCE(AVG(b.totalAmount), 0.0) FROM Booking b WHERE b.status = 'COMPLETED'")
    Double calculateAverageBookingValue();

    // Current month revenue (HQL compatible)
    @Query("SELECT COALESCE(SUM(b.totalAmount), 0.0) FROM Booking b " +
            "WHERE b.status = 'COMPLETED' " +
            "AND MONTH(b.createdAt) = MONTH(CURRENT_DATE) " +
            "AND YEAR(b.createdAt) = YEAR(CURRENT_DATE)")
    Double calculateMonthlyRevenue();

    // Weekly revenue with parameter (HQL compatible)
    @Query("SELECT COALESCE(SUM(b.totalAmount), 0.0) FROM Booking b " +
            "WHERE b.status = 'COMPLETED' " +
            "AND b.createdAt >= :weekStart")
    Double calculateWeeklyRevenue(@Param("weekStart") LocalDateTime weekStart);

    // Daily bookings for trend chart
    @Query("SELECT FUNCTION('DATE', b.createdAt), COUNT(b) " +
            "FROM Booking b " +
            "WHERE b.createdAt >= :since " +
            "GROUP BY FUNCTION('DATE', b.createdAt) " +
            "ORDER BY FUNCTION('DATE', b.createdAt) ASC")
    List<Object[]> findDailyBookingsSince(@Param("since") LocalDateTime since);

    // Find bookings between dates
    List<Booking> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end);

    // Count bookings by status
    Long countByStatus(BookingStatus status);

    // Find bookings by status
    List<Booking> findByStatus(BookingStatus status);

    // Alternative: Native query for weekly revenue (if HQL doesn't work)
    @Query(value = "SELECT COALESCE(SUM(b.total_amount), 0) FROM bookings b " +
            "WHERE b.status = 'COMPLETED' " +
            "AND b.created_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)",
            nativeQuery = true)
    Double calculateWeeklyRevenueNative();

    // Booking count by category
    @Query("SELECT l.category, COUNT(b) FROM Booking b " +
            "JOIN b.listing l " +
            "WHERE b.status = 'COMPLETED' " +
            "GROUP BY l.category")
    List<Object[]> findBookingCountByCategory();

    // Count bookings by listing ID
    @Query("SELECT COUNT(b) FROM Booking b WHERE b.listing.id = :listingId")
    Long countByListingId(@Param("listingId") Long listingId);

    // Count completed bookings by provider
    @Query("SELECT COUNT(b) FROM Booking b WHERE b.status = 'COMPLETED' AND b.provider.id = :providerId")
    Long countCompletedBookingsByProvider(@Param("providerId") Long providerId);

    // Count all bookings by provider
    @Query("SELECT COUNT(b) FROM Booking b WHERE b.provider.id = :providerId")
    Long countBookingsByProvider(@Param("providerId") Long providerId);


}