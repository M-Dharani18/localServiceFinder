package com.quickserve.backend.service.impl;

import com.quickserve.backend.dto.BookingRequest;
import com.quickserve.backend.dto.BookingResponse;
import com.quickserve.backend.model.Booking;
import com.quickserve.backend.model.BookingStatus;
import com.quickserve.backend.model.Listing;
import com.quickserve.backend.model.TimeSlot;
import com.quickserve.backend.model.User;
import com.quickserve.backend.repository.BookingRepository;
import com.quickserve.backend.repository.ListingRepository;
import com.quickserve.backend.repository.TimeSlotRepository;
import com.quickserve.backend.repository.UserRepository;
import com.quickserve.backend.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class BookingServiceImpl implements BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ListingRepository listingRepository;

    @Autowired
    private TimeSlotRepository timeSlotRepository;

    @Override
    public BookingResponse createBooking(BookingRequest request) {
//        // 1. Validate customer
//        User customer = userRepository.findById(request.getCustomerId())
//                .orElseThrow(() -> new RuntimeException("Customer not found"));
//
//        if (!"CUSTOMER".equalsIgnoreCase(customer.getRole())) {
//            throw new RuntimeException("Only customers can create bookings. User role: " + customer.getRole());
//        }
//
//        // 2. Validate provider
//        User provider = userRepository.findById(request.getProviderId())
//                .orElseThrow(() -> new RuntimeException("Provider not found"));
//
//        if (!"PROVIDER".equalsIgnoreCase(provider.getRole())) {
//            throw new RuntimeException("Invalid provider. User role: " + provider.getRole());
//        }

        System.out.println("\n" + "=".repeat(50));
        System.out.println("=== START createBooking ===");
        System.out.println("Request received at: " + LocalDateTime.now());
        System.out.println("Request details:");
        System.out.println("  Customer ID: " + request.getCustomerId());
        System.out.println("  Provider ID: " + request.getProviderId());
        System.out.println("  Listing ID: " + request.getListingId());
        System.out.println("  Booking Time: " + request.getBookingDateTime());
        System.out.println("  Notes: " + request.getNotes());
        System.out.println("=".repeat(50));

        // 1. Validate customer
        User customer = userRepository.findById(request.getCustomerId())
                .orElseThrow(() -> {
                    System.out.println("ERROR: Customer not found: " + request.getCustomerId());
                    return new RuntimeException("Customer not found");
                });

        System.out.println("Customer found: " + customer.getUsername());
        System.out.println("Customer role: " + customer.getRole());
        if (!"CUSTOMER".equalsIgnoreCase(customer.getRole())) {
            System.out.println("ERROR: Customer role check failed. Expected CUSTOMER, got: " + customer.getRole());
            throw new RuntimeException("Only customers can create bookings. User role: " + customer.getRole());
        }

        System.out.println("Customer validation passed");

        // 2. Validate provider
        System.out.println("Looking for provider: " + request.getProviderId());
        User provider = userRepository.findById(request.getProviderId())
                .orElseThrow(() -> {
                    System.out.println("ERROR: Provider not found: " + request.getProviderId());
                    return new RuntimeException("Provider not found");
                });

        System.out.println("Provider found: " + provider.getUsername());
        System.out.println("Provider role: " + provider.getRole());

        if (!"PROVIDER".equalsIgnoreCase(provider.getRole())) { // FIXED LINE
            System.out.println("ERROR: Provider role check failed. Expected PROVIDER, got: " + provider.getRole());
            throw new RuntimeException("Invalid provider. User role: " + provider.getRole());
        }

        System.out.println("Provider validation passed");

        // 3. Validate listing
        Listing listing = listingRepository.findById(request.getListingId())
                .orElseThrow(() -> new RuntimeException("Listing not found"));

        // 4. Verify listing belongs to the provider
        if (!listing.getProvider().getId().equals(request.getProviderId())) {
            throw new RuntimeException("Listing does not belong to the specified provider");
        }

        // 5. Validate booking date is in the future
        if (request.getBookingDateTime().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Cannot book a time slot in the past");
        }

        // 6. ✅ CRITICAL FIX: Find the time slot and validate it
        List<TimeSlot> availableSlots = timeSlotRepository.findAvailableSlotsByListing(
                request.getListingId(),
                LocalDateTime.now()
        );
        // ============ ADD THIS DEBUG CODE HERE ============
        System.out.println("\n=== DEBUG: Time Slot Analysis ===");
        System.out.println("Current time (now): " + LocalDateTime.now());
        System.out.println("Booking time requested: " + request.getBookingDateTime());
        System.out.println("Listing ID: " + request.getListingId());
        System.out.println("Number of available slots found: " + availableSlots.size());

        if (availableSlots.isEmpty()) {
            System.out.println("WARNING: No available slots found with current filters!");
            System.out.println("Query filters: is_available=true AND start_time >= " + LocalDateTime.now());

            // Check ALL slots (not filtered)
            List<TimeSlot> allSlots = timeSlotRepository.findByListingId(request.getListingId());
            System.out.println("All slots in database for listing " + request.getListingId() + ": " + allSlots.size());

            for (TimeSlot slot : allSlots) {
                System.out.println("\nSlot ID: " + slot.getId());
                System.out.println("  Start: " + slot.getStartTime());
                System.out.println("  End: " + slot.getEndTime());
                System.out.println("  Available: " + slot.getIsAvailable());

                // Check why it's not being returned
                boolean isAvailable = slot.getIsAvailable() != null && slot.getIsAvailable();
                boolean isFuture = slot.getStartTime().isAfter(LocalDateTime.now()) ||
                        slot.getStartTime().isEqual(LocalDateTime.now());

                System.out.println("  Is available? " + isAvailable);
                System.out.println("  Is future? " + isFuture);
                System.out.println("  Would pass filter? " + (isAvailable && isFuture));
            }
        } else {
            System.out.println("Available slots found:");
            for (TimeSlot slot : availableSlots) {
                System.out.println("  Slot ID: " + slot.getId() +
                        " | Start: " + slot.getStartTime() +
                        " | End: " + slot.getEndTime());
            }
        }

        // Find the time slot that contains the requested booking time
        TimeSlot matchingSlot = availableSlots.stream()
                .filter(slot ->
                        !request.getBookingDateTime().isBefore(slot.getStartTime()) &&
                                request.getBookingDateTime().isBefore(slot.getEndTime())
                )
                .findFirst()
                .orElseThrow(() -> new RuntimeException("No available time slot found for this booking time"));

        // 7. ✅ CRITICAL FIX: Check if this specific time slot is already booked
        boolean isSlotBooked = bookingRepository.isSlotAlreadyBooked(
                request.getProviderId(),
                request.getListingId(),
                matchingSlot.getStartTime()
        );

        if (isSlotBooked) {
            throw new RuntimeException("This time slot (" +
                    matchingSlot.getStartTime() + " - " + matchingSlot.getEndTime() +
                    ") is already booked. Please select another slot.");
        }

        // 8. ✅ ADDITIONAL CHECK: Verify exact booking time isn't taken
        boolean exactTimeBooked = bookingRepository.existsByProviderAndListingAndDateTime(
                request.getProviderId(),
                request.getListingId(),
                request.getBookingDateTime()
        );

        if (exactTimeBooked) {
            throw new RuntimeException("This exact time is already booked. Please select another time.");
        }

        // 9. Create booking with the time slot's start time (standardize)
        Booking booking = new Booking();
        booking.setCustomer(customer);
        booking.setProvider(provider);
        booking.setListing(listing);

        // ✅ IMPORTANT: Always use the slot's start time for consistency
        booking.setBookingDateTime(matchingSlot.getStartTime());
        booking.setNotes(request.getNotes());
        booking.setStatus(BookingStatus.PENDING);

        Booking savedBooking = bookingRepository.save(booking);

        // 10. ✅ Mark the time slot as unavailable
        matchingSlot.setIsAvailable(false);
        timeSlotRepository.save(matchingSlot);

        return mapToResponse(savedBooking);
    }

    @Override
    public BookingResponse getBookingById(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        return mapToResponse(booking);
    }

    @Override
    public List<BookingResponse> getCustomerBookings(Long customerId) {
        userRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        List<Booking> bookings = bookingRepository.findByCustomerId(customerId);
        return bookings.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<BookingResponse> getProviderBookings(Long providerId) {
        userRepository.findById(providerId)
                .orElseThrow(() -> new RuntimeException("Provider not found"));

        List<Booking> bookings = bookingRepository.findByProviderId(providerId);
        return bookings.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<BookingResponse> getUpcomingCustomerBookings(Long customerId) {
        userRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        List<Booking> bookings = bookingRepository.findUpcomingBookingsByCustomer(
                customerId, LocalDateTime.now());
        return bookings.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<BookingResponse> getPastCustomerBookings(Long customerId) {
        userRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        List<Booking> bookings = bookingRepository.findPastBookingsByCustomer(
                customerId, LocalDateTime.now());
        return bookings.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<BookingResponse> getUpcomingProviderBookings(Long providerId) {
        userRepository.findById(providerId)
                .orElseThrow(() -> new RuntimeException("Provider not found"));

        List<Booking> bookings = bookingRepository.findUpcomingBookingsByProvider(
                providerId, LocalDateTime.now());
        return bookings.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<BookingResponse> getPastProviderBookings(Long providerId) {
        userRepository.findById(providerId)
                .orElseThrow(() -> new RuntimeException("Provider not found"));

        List<Booking> bookings = bookingRepository.findPastBookingsByProvider(
                providerId, LocalDateTime.now());
        return bookings.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public BookingResponse updateBookingStatus(Long bookingId, BookingStatus status) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        validateStatusTransition(booking.getStatus(), status);

        booking.setStatus(status);
        Booking updatedBooking = bookingRepository.save(booking);

        return mapToResponse(updatedBooking);
    }

    @Override
    public BookingResponse cancelBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (booking.getStatus() == BookingStatus.COMPLETED) {
            throw new RuntimeException("Cannot cancel a completed booking");
        }

        if (booking.getStatus() == BookingStatus.CANCELLED) {
            throw new RuntimeException("Booking is already cancelled");
        }

        // ✅ FIX: Mark the time slot as available again when booking is cancelled
        List<TimeSlot> slots = timeSlotRepository.findByListingId(booking.getListing().getId());
        for (TimeSlot slot : slots) {
            if (booking.getBookingDateTime().equals(slot.getStartTime())) {
                slot.setIsAvailable(true);
                timeSlotRepository.save(slot);
                break;
            }
        }

        booking.setStatus(BookingStatus.CANCELLED);
        Booking updatedBooking = bookingRepository.save(booking);

        return mapToResponse(updatedBooking);
    }

    @Override
    public BookingResponse confirmBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (booking.getStatus() != BookingStatus.PENDING) {
            throw new RuntimeException("Only PENDING bookings can be confirmed");
        }

        booking.setStatus(BookingStatus.CONFIRMED);
        Booking updatedBooking = bookingRepository.save(booking);

        return mapToResponse(updatedBooking);
    }

    @Override
    public BookingResponse completeBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (booking.getStatus() != BookingStatus.CONFIRMED) {
            throw new RuntimeException("Only CONFIRMED bookings can be marked as completed");
        }

        booking.setStatus(BookingStatus.COMPLETED);
        Booking updatedBooking = bookingRepository.save(booking);

        return mapToResponse(updatedBooking);
    }

    private void validateStatusTransition(BookingStatus currentStatus, BookingStatus newStatus) {
        switch (currentStatus) {
            case PENDING:
                if (newStatus != BookingStatus.CONFIRMED && newStatus != BookingStatus.CANCELLED) {
                    throw new RuntimeException("PENDING bookings can only be CONFIRMED or CANCELLED");
                }
                break;
            case CONFIRMED:
                if (newStatus != BookingStatus.COMPLETED && newStatus != BookingStatus.CANCELLED) {
                    throw new RuntimeException("CONFIRMED bookings can only be COMPLETED or CANCELLED");
                }
                break;
            case COMPLETED:
                throw new RuntimeException("COMPLETED bookings cannot be changed");
            case CANCELLED:
                throw new RuntimeException("CANCELLED bookings cannot be changed");
        }
    }

    private BookingResponse mapToResponse(Booking booking) {
        BookingResponse response = new BookingResponse();
        response.setId(booking.getId());
        response.setCustomerId(booking.getCustomer().getId());
        response.setCustomerName(booking.getCustomer().getUsername());
        response.setCustomerEmail(booking.getCustomer().getEmail());
        response.setProviderId(booking.getProvider().getId());
        response.setProviderName(booking.getProvider().getUsername());
        response.setProviderEmail(booking.getProvider().getEmail());
        response.setListingId(booking.getListing().getId());
        response.setServiceName(booking.getListing().getServiceName());
        response.setBookingDateTime(booking.getBookingDateTime());
        response.setStatus(booking.getStatus());
        response.setNotes(booking.getNotes());
        response.setCreatedAt(booking.getCreatedAt());
        response.setUpdatedAt(booking.getUpdatedAt());
        return response;
    }
}