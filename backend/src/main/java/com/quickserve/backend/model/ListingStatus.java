package com.quickserve.backend.model;

public enum ListingStatus {
    PENDING,     // Newly created, waiting for admin approval
    APPROVED,    // Admin approved, visible to customers
    REJECTED,    // Admin rejected
    FLAGGED      // Flagged for review (suspicious content, etc.)
}