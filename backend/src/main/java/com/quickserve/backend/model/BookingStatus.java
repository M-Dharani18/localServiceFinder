package com.quickserve.backend.model;

public enum BookingStatus {
    PENDING,      // Booking created, waiting for provider action
    CONFIRMED,    // Provider accepts the booking
    COMPLETED,    // Service successfully finished
    CANCELLED     // Booking cancelled by customer or provider
}