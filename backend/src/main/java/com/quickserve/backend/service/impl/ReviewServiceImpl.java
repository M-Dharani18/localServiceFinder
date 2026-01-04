package com.quickserve.backend.service.impl;

import com.quickserve.backend.dto.ListingRatingResponse;
import com.quickserve.backend.dto.ReviewRequest;
import com.quickserve.backend.dto.ReviewResponse;
import com.quickserve.backend.model.Booking;
import com.quickserve.backend.model.BookingStatus;
import com.quickserve.backend.model.Review;
import com.quickserve.backend.repository.BookingRepository;
import com.quickserve.backend.repository.ReviewRepository;
import com.quickserve.backend.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Override
    public ReviewResponse createReview(ReviewRequest request) {
        // 1. Validate rating (1-5)
        if (request.getRating() < 1 || request.getRating() > 5) {
            throw new RuntimeException("Rating must be between 1 and 5");
        }

        // 2. Validate booking exists
        Booking booking = bookingRepository.findById(request.getBookingId())
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        // 3. Verify booking is COMPLETED
        if (booking.getStatus() != BookingStatus.COMPLETED) {
            throw new RuntimeException("Can only review completed bookings");
        }

        // 4. Verify customer is the one who made the booking
        if (!booking.getCustomer().getId().equals(request.getCustomerId())) {
            throw new RuntimeException("Only the customer who made the booking can review it");
        }

        // 5. Check if review already exists for this booking
        if (reviewRepository.existsByBookingId(request.getBookingId())) {
            throw new RuntimeException("Review already exists for this booking");
        }

        // 6. Create review
        Review review = new Review();
        review.setBooking(booking);
        review.setCustomer(booking.getCustomer());
        review.setProvider(booking.getProvider());
        review.setListing(booking.getListing());
        review.setRating(request.getRating());
        review.setComment(request.getComment());

        Review savedReview = reviewRepository.save(review);

        return mapToResponse(savedReview);
    }

    @Override
    public ReviewResponse getReviewById(Long reviewId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("Review not found"));
        return mapToResponse(review);
    }

    @Override
    public ReviewResponse getReviewByBookingId(Long bookingId) {
        Review review = reviewRepository.findByBookingId(bookingId)
                .orElseThrow(() -> new RuntimeException("Review not found for this booking"));
        return mapToResponse(review);
    }

    @Override
    public List<ReviewResponse> getCustomerReviews(Long customerId) {
        List<Review> reviews = reviewRepository.findByCustomerId(customerId);
        return reviews.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<ReviewResponse> getProviderReviews(Long providerId) {
        List<Review> reviews = reviewRepository.findByProviderId(providerId);
        return reviews.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<ReviewResponse> getListingReviews(Long listingId) {
        List<Review> reviews = reviewRepository.findRecentReviewsByListing(listingId);
        return reviews.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public ListingRatingResponse getListingRating(Long listingId) {
        Double avgRating = reviewRepository.getAverageRatingForListing(listingId);
        Long totalReviews = reviewRepository.getReviewCountForListing(listingId);
        
        // Get listing name
        List<Review> reviews = reviewRepository.findByListingId(listingId);
        String serviceName = reviews.isEmpty() ? "Unknown" : reviews.get(0).getListing().getServiceName();

        return new ListingRatingResponse(
                listingId,
                serviceName,
                avgRating != null ? avgRating : 0.0,
                totalReviews
        );
    }

    @Override
    public ReviewResponse updateReview(Long reviewId, ReviewRequest request) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("Review not found"));

        // Validate rating
        if (request.getRating() < 1 || request.getRating() > 5) {
            throw new RuntimeException("Rating must be between 1 and 5");
        }

        // Verify customer is the owner of the review
        if (!review.getCustomer().getId().equals(request.getCustomerId())) {
            throw new RuntimeException("Only the review author can update it");
        }

        // Update review
        review.setRating(request.getRating());
        review.setComment(request.getComment());

        Review updatedReview = reviewRepository.save(review);

        return mapToResponse(updatedReview);
    }

    @Override
    public void deleteReview(Long reviewId) {
        if (!reviewRepository.existsById(reviewId)) {
            throw new RuntimeException("Review not found");
        }
        reviewRepository.deleteById(reviewId);
    }

    // Helper method to map Review entity to ReviewResponse DTO
    private ReviewResponse mapToResponse(Review review) {
        ReviewResponse response = new ReviewResponse();
        response.setId(review.getId());
        response.setBookingId(review.getBooking().getId());
        response.setCustomerId(review.getCustomer().getId());
        response.setCustomerName(review.getCustomer().getUsername());
        response.setProviderId(review.getProvider().getId());
        response.setProviderName(review.getProvider().getUsername());
        response.setListingId(review.getListing().getId());
        response.setServiceName(review.getListing().getServiceName());
        response.setRating(review.getRating());
        response.setComment(review.getComment());
        response.setCreatedAt(review.getCreatedAt());
        return response;
    }
}