package com.quickserve.backend.controller;

import com.quickserve.backend.dto.BookingRequest;
import com.quickserve.backend.dto.BookingResponse;
import com.quickserve.backend.model.BookingStatus;
import com.quickserve.backend.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.HashMap;
import java.util.Map;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    // Create a new booking
    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody BookingRequest request) {
        try {
            BookingResponse response = bookingService.createBooking(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (RuntimeException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Booking Failed");
            errorResponse.put("message", e.getMessage());
            errorResponse.put("timestamp", LocalDateTime.now().toString());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }

    // Get booking by ID
    @GetMapping("/{bookingId}")
    public ResponseEntity<BookingResponse> getBookingById(@PathVariable Long bookingId) {
        try {
            BookingResponse response = bookingService.getBookingById(bookingId);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // Get all bookings for a customer
    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<BookingResponse>> getCustomerBookings(@PathVariable Long customerId) {
        List<BookingResponse> bookings = bookingService.getCustomerBookings(customerId);
        return ResponseEntity.ok(bookings);
    }

    // Get all bookings for a provider
    @GetMapping("/provider/{providerId}")
    public ResponseEntity<List<BookingResponse>> getProviderBookings(@PathVariable Long providerId) {
        List<BookingResponse> bookings = bookingService.getProviderBookings(providerId);
        return ResponseEntity.ok(bookings);
    }

    // Get upcoming bookings for customer
    @GetMapping("/customer/{customerId}/upcoming")
    public ResponseEntity<List<BookingResponse>> getUpcomingCustomerBookings(@PathVariable Long customerId) {
        List<BookingResponse> bookings = bookingService.getUpcomingCustomerBookings(customerId);
        return ResponseEntity.ok(bookings);
    }

    // Get past bookings for customer
    @GetMapping("/customer/{customerId}/past")
    public ResponseEntity<List<BookingResponse>> getPastCustomerBookings(@PathVariable Long customerId) {
        List<BookingResponse> bookings = bookingService.getPastCustomerBookings(customerId);
        return ResponseEntity.ok(bookings);
    }

    // Get upcoming bookings for provider
    @GetMapping("/provider/{providerId}/upcoming")
    public ResponseEntity<List<BookingResponse>> getUpcomingProviderBookings(@PathVariable Long providerId) {
        List<BookingResponse> bookings = bookingService.getUpcomingProviderBookings(providerId);
        return ResponseEntity.ok(bookings);
    }

    // Get past bookings for provider
    @GetMapping("/provider/{providerId}/past")
    public ResponseEntity<List<BookingResponse>> getPastProviderBookings(@PathVariable Long providerId) {
        List<BookingResponse> bookings = bookingService.getPastProviderBookings(providerId);
        return ResponseEntity.ok(bookings);
    }

    // Update booking status
    @PutMapping("/{bookingId}/status")
    public ResponseEntity<BookingResponse> updateBookingStatus(
            @PathVariable Long bookingId,
            @RequestParam BookingStatus status) {
        try {
            BookingResponse response = bookingService.updateBookingStatus(bookingId, status);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    // Confirm booking (provider accepts)
    @PutMapping("/{bookingId}/confirm")
    public ResponseEntity<BookingResponse> confirmBooking(@PathVariable Long bookingId) {
        try {
            BookingResponse response = bookingService.confirmBooking(bookingId);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    // Complete booking
    @PutMapping("/{bookingId}/complete")
    public ResponseEntity<BookingResponse> completeBooking(@PathVariable Long bookingId) {
        try {
            BookingResponse response = bookingService.completeBooking(bookingId);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    // Cancel booking
    @PutMapping("/{bookingId}/cancel")
    public ResponseEntity<BookingResponse> cancelBooking(@PathVariable Long bookingId) {
        try {
            BookingResponse response = bookingService.cancelBooking(bookingId);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }
}