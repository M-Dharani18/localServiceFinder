package com.quickserve.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String type; // BOOKING_CREATED, BOOKING_CONFIRMED, BOOKING_COMPLETED, BOOKING_CANCELLED, REVIEW_RECEIVED, etc.

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "is_read", nullable = false)
    private Boolean isRead = false;

    @Column(name = "is_important")
    private Boolean isImportant = false;

    // Related entities (optional, for navigation)
    @Column(name = "booking_id")
    private Long bookingId;

    @Column(name = "listing_id")
    private Long listingId;

    @Column(name = "review_id")
    private Long reviewId;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}