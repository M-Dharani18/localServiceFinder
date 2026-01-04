package com.quickserve.backend.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "reviews")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "booking_id", nullable = false, unique = true)
    private Booking booking;  // One review per booking

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private User customer;

    @ManyToOne
    @JoinColumn(name = "provider_id", nullable = false)
    private User provider;

    @ManyToOne
    @JoinColumn(name = "listing_id", nullable = false)
    private Listing listing;

    @Column(nullable = false)
    private Integer rating;  // 1-5 stars

    @Column(length = 1000)
    private String comment;  // Optional feedback

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public void setCreatedAt() {
        this.createdAt = LocalDateTime.now();
    }

    // Validation: rating must be between 1 and 5
    @PrePersist
    @PreUpdate
    public void validateRating() {
        if (rating < 1 || rating > 5) {
            throw new IllegalArgumentException("Rating must be between 1 and 5");
        }
    }
}