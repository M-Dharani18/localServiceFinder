package com.quickserve.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NotificationDTO {
    private Long id;
    private Long userId;
    private String type;
    private String title;
    private String description;
    private Boolean isRead;
    private Boolean isImportant;
    private Long bookingId;
    private Long listingId;
    private Long reviewId;
    private LocalDateTime createdAt;
    private String timeAgo; // Human-readable time
}

