package com.quickserve.backend.controller;

import com.quickserve.backend.dto.ListingRatingResponse;
import com.quickserve.backend.dto.ReviewRequest;
import com.quickserve.backend.dto.ReviewResponse;
import com.quickserve.backend.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "*")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    // Create a review
    @PostMapping
    public ResponseEntity<ReviewResponse> createReview(@RequestBody ReviewRequest request) {
        try {
            ReviewResponse response = reviewService.createReview(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    // Get review by ID
    @GetMapping("/{reviewId}")
    public ResponseEntity<ReviewResponse> getReviewById(@PathVariable Long reviewId) {
        try {
            ReviewResponse response = reviewService.getReviewById(reviewId);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // Get review for a specific booking
    @GetMapping("/booking/{bookingId}")
    public ResponseEntity<ReviewResponse> getReviewByBookingId(@PathVariable Long bookingId) {
        try {
            ReviewResponse response = reviewService.getReviewByBookingId(bookingId);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // Get all reviews by customer
    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<ReviewResponse>> getCustomerReviews(@PathVariable Long customerId) {
        List<ReviewResponse> reviews = reviewService.getCustomerReviews(customerId);
        return ResponseEntity.ok(reviews);
    }

    // Get all reviews for a provider
    @GetMapping("/provider/{providerId}")
    public ResponseEntity<List<ReviewResponse>> getProviderReviews(@PathVariable Long providerId) {
        List<ReviewResponse> reviews = reviewService.getProviderReviews(providerId);
        return ResponseEntity.ok(reviews);
    }

    // Get all reviews for a listing
    @GetMapping("/listing/{listingId}")
    public ResponseEntity<List<ReviewResponse>> getListingReviews(@PathVariable Long listingId) {
        List<ReviewResponse> reviews = reviewService.getListingReviews(listingId);
        return ResponseEntity.ok(reviews);
    }

    // Get average rating for a listing
    @GetMapping("/listing/{listingId}/rating")
    public ResponseEntity<ListingRatingResponse> getListingRating(@PathVariable Long listingId) {
        ListingRatingResponse rating = reviewService.getListingRating(listingId);
        return ResponseEntity.ok(rating);
    }

    // Update a review
    @PutMapping("/{reviewId}")
    public ResponseEntity<ReviewResponse> updateReview(
            @PathVariable Long reviewId,
            @RequestBody ReviewRequest request) {
        try {
            ReviewResponse response = reviewService.updateReview(reviewId, request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    // Delete a review
    @DeleteMapping("/{reviewId}")
    public ResponseEntity<String> deleteReview(@PathVariable Long reviewId) {
        try {
            reviewService.deleteReview(reviewId);
            return ResponseEntity.ok("Review deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Review not found");
        }
    }
}