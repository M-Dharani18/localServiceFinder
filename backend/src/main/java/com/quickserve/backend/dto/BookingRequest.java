package com.quickserve.backend.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class BookingRequest {

    private Long customerId;
    private Long providerId;
    private Long listingId;
    private LocalDateTime bookingDateTime;
    private String notes;
}