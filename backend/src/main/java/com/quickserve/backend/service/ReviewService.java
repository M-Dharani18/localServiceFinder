package com.quickserve.backend.service;

import com.quickserve.backend.dto.ListingRatingResponse;
import com.quickserve.backend.dto.ReviewRequest;
import com.quickserve.backend.dto.ReviewResponse;

import java.util.List;

public interface ReviewService {

    // Create a review for a completed booking
    ReviewResponse createReview(ReviewRequest request);

    // Get review by ID
    ReviewResponse getReviewById(Long reviewId);

    // Get review for a specific booking
    ReviewResponse getReviewByBookingId(Long bookingId);

    // Get all reviews by customer
    List<ReviewResponse> getCustomerReviews(Long customerId);

    // Get all reviews for a provider
    List<ReviewResponse> getProviderReviews(Long providerId);

    // Get all reviews for a listing
    List<ReviewResponse> getListingReviews(Long listingId);

    // Get average rating and review count for a listing
    ListingRatingResponse getListingRating(Long listingId);

    // Update a review
    ReviewResponse updateReview(Long reviewId, ReviewRequest request);

    // Delete a review
    void deleteReview(Long reviewId);
}