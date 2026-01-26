package com.quickserve.backend.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "listings")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Listing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "provider_id", nullable = false)
    private User provider;

    private String serviceName;

    @Column(length = 1000)
    private String description;

    private Double price;

    private String location;

    private String category;

    private String imageUrl;

    // New field for availability
    @Column(nullable = false)
    public Boolean isAvailable = true;

    // Optional: For location-based proximity search
    private Double latitude;

    private Double longitude;

    // ✅ NEW: Admin approval status
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ListingStatus status = ListingStatus.PENDING;

    // ✅ NEW: Admin rejection/flag reason
    @Column(length = 500)
    private String adminNotes;

    // ✅ NEW: Track who approved/rejected
    @ManyToOne
    @JoinColumn(name = "reviewed_by")
    private User reviewedBy;

    // ✅ ADD THESE MISSING FIELDS:
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime reviewedAt;

    @PrePersist
    public void setCreatedAt() {
        this.createdAt = LocalDateTime.now();}
}