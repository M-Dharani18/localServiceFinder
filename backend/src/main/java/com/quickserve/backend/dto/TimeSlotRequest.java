package com.quickserve.backend.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class TimeSlotRequest {

    private Long providerId;
    private Long listingId;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
}