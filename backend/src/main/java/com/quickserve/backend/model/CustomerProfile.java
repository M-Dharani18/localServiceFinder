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
@Table(name = "customer_profiles")
public class CustomerProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private Long customerId; // references users.id

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false)
    private String email; // Store email in profile for quick access

    private String phone;
    private String address;

    @Column(columnDefinition = "TEXT")
    private String bio = "Tell us about yourself...";

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}