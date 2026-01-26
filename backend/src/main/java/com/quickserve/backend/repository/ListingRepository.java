package com.quickserve.backend.repository;

import com.quickserve.backend.model.Listing;
import com.quickserve.backend.model.ListingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ListingRepository extends JpaRepository<Listing, Long> {

    // Find by provider
    List<Listing> findByProviderId(Long providerId);

    // Only get available listings (for customers)
    List<Listing> findByIsAvailableTrue();

    // Search by keyword in service name or description
    @Query("SELECT l FROM Listing l WHERE l.isAvailable = true AND " +
            "(LOWER(l.serviceName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(l.description) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    List<Listing> searchAvailableListings(@Param("keyword") String keyword);

    // Filter by category (only available)
    List<Listing> findByCategoryIgnoreCaseAndIsAvailableTrue(String category);

    // Filter by location (only available)
    List<Listing> findByLocationContainingIgnoreCaseAndIsAvailableTrue(String location);

    // Advanced search with multiple filters
    @Query("SELECT l FROM Listing l WHERE l.isAvailable = true " +
            "AND (:keyword IS NULL OR LOWER(l.serviceName) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(l.description) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
            "AND (:category IS NULL OR LOWER(l.category) = LOWER(:category)) " +
            "AND (:location IS NULL OR LOWER(l.location) LIKE LOWER(CONCAT('%', :location, '%'))) " +
            "AND (:minPrice IS NULL OR l.price >= :minPrice) " +
            "AND (:maxPrice IS NULL OR l.price <= :maxPrice)")
    List<Listing> advancedSearch(
            @Param("keyword") String keyword,
            @Param("category") String category,
            @Param("location") String location,
            @Param("minPrice") Double minPrice,
            @Param("maxPrice") Double maxPrice
    );

    // Get all unique categories for dropdown
    @Query("SELECT DISTINCT l.category FROM Listing l WHERE l.isAvailable = true ORDER BY l.category")
    List<String> findAllDistinctCategories();

    // Get all unique locations for dropdown
    @Query("SELECT DISTINCT l.location FROM Listing l WHERE l.isAvailable = true ORDER BY l.location")
    List<String> findAllDistinctLocations();

    // ✅ NEW: Admin queries - Find listings by status
    List<Listing> findByStatus(ListingStatus status);

    // ✅ NEW: Find only APPROVED listings for customers
    List<Listing> findByStatusAndServiceNameContainingIgnoreCase(
            ListingStatus status, String keyword);

    List<Listing> findByStatusAndCategoryIgnoreCase(
            ListingStatus status, String category);

    // ✅ NEW: Count listings by status
    Long countByStatus(ListingStatus status);

    // ✅ NEW: Get all approved listings (for customer view)
    @Query("SELECT l FROM Listing l WHERE l.status = 'APPROVED' ORDER BY l.id DESC")
    List<Listing> findAllApprovedListings();

    // ✅ NEW: Get pending listings for admin review
    @Query("SELECT l FROM Listing l WHERE l.status = 'PENDING' ORDER BY l.id ASC")
    List<Listing> findPendingListings();

    // ✅ NEW: Top categories by booking count
    @Query("SELECT l.category, COUNT(b.id) as bookingCount " +
            "FROM Listing l LEFT JOIN Booking b ON b.listing.id = l.id " +
            "WHERE l.status = 'APPROVED' " +
            "GROUP BY l.category " +
            "ORDER BY bookingCount DESC")
    List<Object[]> findTopCategories();

    // ✅ NEW: Top services by booking count
    @Query("SELECT l.id, l.serviceName, l.provider.username, l.category, COUNT(b.id) as bookingCount " +
            "FROM Listing l LEFT JOIN Booking b ON b.listing.id = l.id " +
            "WHERE l.status = 'APPROVED' " +
            "GROUP BY l.id, l.serviceName, l.provider.username, l.category " +
            "ORDER BY bookingCount DESC")
    List<Object[]> findTopServices();

    // ✅ NEW: Count listings per category
    @Query("SELECT l.category, COUNT(l.id) FROM Listing l " +
            "WHERE l.status = :status GROUP BY l.category")
    List<Object[]> countListingsByCategory(@Param("status") ListingStatus status);

    // Add these methods to ListingRepository.java:

    // Find approved listings by keyword
    @Query("SELECT l FROM Listing l WHERE l.status = 'APPROVED' AND " +
            "(LOWER(l.serviceName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(l.description) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    List<Listing> findApprovedListingsByKeyword(@Param("keyword") String keyword);

    // Find approved listings by location
    @Query("SELECT l FROM Listing l WHERE l.status = 'APPROVED' AND " +
            "LOWER(l.location) LIKE LOWER(CONCAT('%', :location, '%'))")
    List<Listing> findApprovedListingsByLocation(@Param("location") String location);

    // Update advancedSearch to check status
    @Query("SELECT l FROM Listing l WHERE l.status = 'APPROVED' " +
            "AND (:keyword IS NULL OR LOWER(l.serviceName) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(l.description) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
            "AND (:category IS NULL OR LOWER(l.category) = LOWER(:category)) " +
            "AND (:location IS NULL OR LOWER(l.location) LIKE LOWER(CONCAT('%', :location, '%'))) " +
            "AND (:minPrice IS NULL OR l.price >= :minPrice) " +
            "AND (:maxPrice IS NULL OR l.price <= :maxPrice)")
    List<Listing> advancedSearchApproved(
            @Param("keyword") String keyword,
            @Param("category") String category,
            @Param("location") String location,
            @Param("minPrice") Double minPrice,
            @Param("maxPrice") Double maxPrice
    );

    // Count listings by provider ID
    @Query("SELECT COUNT(l) FROM Listing l WHERE l.provider.id = :providerId")
    Long countByProviderId(@Param("providerId") Long providerId);
}
