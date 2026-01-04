package com.quickserve.backend.repository;

import com.quickserve.backend.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    // Find review by booking ID
    Optional<Review> findByBookingId(Long bookingId);

    // Check if review exists for a booking
    boolean existsByBookingId(Long bookingId);

    // Find all reviews by customer
    List<Review> findByCustomerId(Long customerId);

    // Find all reviews for a provider
    List<Review> findByProviderId(Long providerId);

    // Find all reviews for a specific listing
    List<Review> findByListingId(Long listingId);

    // Get average rating for a listing
    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.listing.id = :listingId")
    Double getAverageRatingForListing(@Param("listingId") Long listingId);

    // Get average rating for a provider (across all their listings)
    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.provider.id = :providerId")
    Double getAverageRatingForProvider(@Param("providerId") Long providerId);

    // Get total review count for a listing
    @Query("SELECT COUNT(r) FROM Review r WHERE r.listing.id = :listingId")
    Long getReviewCountForListing(@Param("listingId") Long listingId);

    // Get total review count for a provider
    @Query("SELECT COUNT(r) FROM Review r WHERE r.provider.id = :providerId")
    Long getReviewCountForProvider(@Param("providerId") Long providerId);

    // Get recent reviews for a listing (for display)
    @Query("SELECT r FROM Review r WHERE r.listing.id = :listingId ORDER BY r.createdAt DESC")
    List<Review> findRecentReviewsByListing(@Param("listingId") Long listingId);

    // Get reviews by rating (filter)
    List<Review> findByListingIdAndRating(Long listingId, Integer rating);
}