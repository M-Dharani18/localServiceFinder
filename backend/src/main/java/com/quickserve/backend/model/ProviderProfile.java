package com.quickserve.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "provider_profiles")
public class ProviderProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private Long providerId; // references users.id for providers

    private String businessName;
    private String phone;
    private String city;
    private String area;

    @Column(length = 1000)
    private String categories; // comma-separated values

    @Column(length = 2000)
    private String description;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
