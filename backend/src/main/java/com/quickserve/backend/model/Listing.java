package com.quickserve.backend.model;

import jakarta.persistence.*;
import lombok.*;

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
    private Boolean isAvailable = true;

    // Optional: For location-based proximity search
    private Double latitude;

    private Double longitude;
}