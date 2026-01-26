package com.quickserve.backend.model;

public enum NotificationType {
    // Booking notifications
    BOOKING_CREATED("booking", "New Booking Created"),
    BOOKING_CONFIRMED("booking", "Booking Confirmed"),
    BOOKING_COMPLETED("booking", "Booking Completed"),
    BOOKING_CANCELLED("booking", "Booking Cancelled"),

    // Review notifications
    REVIEW_RECEIVED("review", "New Review Received"),
    REVIEW_REMINDER("reminder", "Review Reminder"),

    // System notifications
    PROFILE_UPDATE_REQUIRED("system", "Profile Update Required"),
    PAYMENT_RECEIVED("system", "Payment Received"),

    // Provider notifications
    NEW_BOOKING_REQUEST("booking", "New Booking Request"),

    // Promotion notifications
    SPECIAL_OFFER("promotion", "Special Offer");

    private final String category;
    private final String displayName;

    NotificationType(String category, String displayName) {
        this.category = category;
        this.displayName = displayName;
    }

    public String getCategory() {
        return category;
    }

    public String getDisplayName() {
        return displayName;
    }
}