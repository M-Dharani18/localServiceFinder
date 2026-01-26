package com.quickserve.backend.dto;

import com.quickserve.backend.model.ListingStatus;
import lombok.Data;

@Data
public class ListingApprovalRequest {

    private Long listingId;
    private Long adminId;
    private ListingStatus status; // APPROVED, REJECTED, FLAGGED
    private String adminNotes; 
}