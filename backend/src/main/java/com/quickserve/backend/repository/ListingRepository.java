package com.quickserve.backend.repository;

import com.quickserve.backend.model.Listing;
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
}