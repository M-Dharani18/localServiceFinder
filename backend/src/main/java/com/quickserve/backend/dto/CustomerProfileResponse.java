package com.quickserve.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerProfileResponse {
    private Long customerId;
    private String fullName;
    private String email;
    private String phone;
    private String address;
    private String bio;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}