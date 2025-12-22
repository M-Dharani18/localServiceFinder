package com.quickserve.backend.service;

import com.quickserve.backend.dto.BookingRequest;
import com.quickserve.backend.dto.BookingResponse;
import com.quickserve.backend.model.BookingStatus;

import java.util.List;

public interface BookingService {

    // Create a new booking
    BookingResponse createBooking(BookingRequest request);

    // Get booking by ID
    BookingResponse getBookingById(Long bookingId);

    // Get all bookings for a customer
    List<BookingResponse> getCustomerBookings(Long customerId);

    // Get all bookings for a provider
    List<BookingResponse> getProviderBookings(Long providerId);

    // Get upcoming bookings for customer
    List<BookingResponse> getUpcomingCustomerBookings(Long customerId);

    // Get past bookings for customer
    List<BookingResponse> getPastCustomerBookings(Long customerId);

    // Get upcoming bookings for provider
    List<BookingResponse> getUpcomingProviderBookings(Long providerId);

    // Get past bookings for provider
    List<BookingResponse> getPastProviderBookings(Long providerId);

    // Update booking status
    BookingResponse updateBookingStatus(Long bookingId, BookingStatus status);

    // Cancel booking
    BookingResponse cancelBooking(Long bookingId);

    // Confirm booking (provider accepts)
    BookingResponse confirmBooking(Long bookingId);

    // Complete booking
    BookingResponse completeBooking(Long bookingId);
}