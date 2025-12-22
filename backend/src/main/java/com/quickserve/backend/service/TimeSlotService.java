package com.quickserve.backend.service;

import com.quickserve.backend.dto.TimeSlotRequest;
import com.quickserve.backend.dto.TimeSlotResponse;

import java.util.List;

public interface TimeSlotService {

    // Create a new time slot
    TimeSlotResponse createTimeSlot(TimeSlotRequest request);

    // Get time slot by ID
    TimeSlotResponse getTimeSlotById(Long timeSlotId);

    // Get all time slots for a provider
    List<TimeSlotResponse> getProviderTimeSlots(Long providerId);

    // Get available time slots for a specific listing
    List<TimeSlotResponse> getAvailableSlotsByListing(Long listingId);

    // Get available time slots for a provider
    List<TimeSlotResponse> getAvailableSlotsByProvider(Long providerId);

    // Mark time slot as unavailable (when booked)
    TimeSlotResponse markSlotAsUnavailable(Long timeSlotId);

    // Mark time slot as available (when booking cancelled)
    TimeSlotResponse markSlotAsAvailable(Long timeSlotId);

    // Delete time slot
    void deleteTimeSlot(Long timeSlotId);
}