package com.quickserve.backend.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class CustomerProfileRequest {
    private Long customerId;
    private String fullName;
    private String email;
    private String phone;
    private String address;
    private String bio;
}