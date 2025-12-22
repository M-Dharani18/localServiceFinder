package com.quickserve.backend.service.impl;

import com.quickserve.backend.dto.TimeSlotRequest;
import com.quickserve.backend.dto.TimeSlotResponse;
import com.quickserve.backend.model.Listing;
import com.quickserve.backend.model.TimeSlot;
import com.quickserve.backend.model.User;
import com.quickserve.backend.repository.ListingRepository;
import com.quickserve.backend.repository.TimeSlotRepository;
import com.quickserve.backend.repository.UserRepository;
import com.quickserve.backend.service.TimeSlotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class TimeSlotServiceImpl implements TimeSlotService {

    @Autowired
    private TimeSlotRepository timeSlotRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ListingRepository listingRepository;

    @Override
    public TimeSlotResponse createTimeSlot(TimeSlotRequest request) {
        System.out.println("\n\n=== DETAILED DEBUG in TimeSlotServiceImpl ===");
        System.out.println("=== STARTING createTimeSlot ===");
        System.out.println("Request details:");
        System.out.println("- providerId: " + request.getProviderId());
        System.out.println("- listingId: " + request.getListingId());
        System.out.println("- startTime: " + request.getStartTime());
        System.out.println("- endTime: " + request.getEndTime());

        // Step 1: Check if provider exists
        System.out.println("\n1. Checking provider with ID: " + request.getProviderId());
        Optional<User> providerOpt = userRepository.findById(request.getProviderId());
        if (providerOpt.isEmpty()) {
            System.err.println("❌ ERROR: Provider not found in database!");
            System.err.println("   Tried to find provider with ID: " + request.getProviderId());

            // List all users to help debug
            List<User> allUsers = userRepository.findAll();
            System.err.println("   Available users in database:");
            if (allUsers.isEmpty()) {
                System.err.println("   No users found in database!");
            } else {
                allUsers.forEach(user ->
                        System.err.println("   - ID: " + user.getId() +
                                ", Username: " + user.getUsername() +
                                ", Email: " + user.getEmail() +
                                ", Role: " + user.getRole()));
            }

            throw new RuntimeException("Provider not found with ID: " + request.getProviderId());
        }
        User provider = providerOpt.get();
        System.out.println("✅ Found provider: " + provider.getUsername() + " (ID: " + provider.getId() + ", Email: " + provider.getEmail() + ")");

        // Step 2: Check if listing exists
        System.out.println("\n2. Checking listing with ID: " + request.getListingId());
        Optional<Listing> listingOpt = listingRepository.findById(request.getListingId());
        if (listingOpt.isEmpty()) {
            System.err.println("❌ ERROR: Listing not found in database!");
            System.err.println("   Tried to find listing with ID: " + request.getListingId());

            // List all listings to help debug
            List<Listing> allListings = listingRepository.findAll();
            System.err.println("   Available listings in database:");
            if (allListings.isEmpty()) {
                System.err.println("   No listings found in database!");
            } else {
                allListings.forEach(listing ->
                        System.err.println("   - ID: " + listing.getId() +
                                ", Name: " + listing.getServiceName() +
                                ", Provider ID: " + listing.getProvider().getId() +
                                ", Available: " + listing.getIsAvailable()));
            }

            throw new RuntimeException("Listing not found with ID: " + request.getListingId());
        }
        Listing listing = listingOpt.get();
        System.out.println("✅ Found listing: " + listing.getServiceName() + " (ID: " + listing.getId() + ")");

        // Step 3: Check if listing belongs to provider
        System.out.println("\n3. Verifying listing ownership:");
        Long listingProviderId = listing.getProvider().getId();
        Long requestProviderId = request.getProviderId();
        System.out.println("   Listing's actual provider ID: " + listingProviderId);
        System.out.println("   Requested provider ID: " + requestProviderId);
        System.out.println("   Listing provider username: " + listing.getProvider().getUsername());

        if (!listingProviderId.equals(requestProviderId)) {
            System.err.println("❌ ERROR: Listing ownership mismatch!");
            System.err.println("   Listing ID " + listing.getId() + " belongs to provider ID " + listingProviderId);
            System.err.println("   But you're trying to create time slot as provider ID " + requestProviderId);
            throw new RuntimeException("Listing does not belong to this provider. Listing belongs to provider ID: " + listingProviderId);
        }
        System.out.println("✅ Listing ownership verified successfully");

        // Step 4: Check for time conflicts
        System.out.println("\n4. Checking for time slot conflicts...");
        boolean hasConflict = timeSlotRepository.existsConflictingSlot(
                request.getProviderId(),
                request.getListingId(),
                request.getStartTime(),
                request.getEndTime()
        );

        if (hasConflict) {
            System.err.println("❌ ERROR: Time slot conflict detected");

            // Show existing time slots for this listing
            List<TimeSlot> existingSlots = timeSlotRepository.findByListingId(request.getListingId());
            System.err.println("   Existing time slots for listing ID " + request.getListingId() + ":");
            if (existingSlots.isEmpty()) {
                System.err.println("   No existing time slots found");
            } else {
                existingSlots.forEach(slot ->
                        System.err.println("   - Slot ID: " + slot.getId() +
                                ", Start: " + slot.getStartTime() +
                                ", End: " + slot.getEndTime() +
                                ", Available: " + slot.getIsAvailable()));
            }

            throw new RuntimeException("Time slot conflicts with existing slot");
        }
        System.out.println("✅ No time conflicts found");

        // Step 5: Validate time range
        System.out.println("\n5. Validating time range...");
        LocalDateTime now = LocalDateTime.now();
        System.out.println("   Current time: " + now);
        System.out.println("   Requested start time: " + request.getStartTime());
        System.out.println("   Requested end time: " + request.getEndTime());

        if (request.getStartTime() == null || request.getEndTime() == null) {
            System.err.println("❌ ERROR: Start time or end time is null");
            throw new RuntimeException("Start time and end time are required");
        }

        if (request.getStartTime().isAfter(request.getEndTime())) {
            System.err.println("❌ ERROR: Start time is after end time");
            System.err.println("   Start: " + request.getStartTime());
            System.err.println("   End: " + request.getEndTime());
            throw new RuntimeException("Start time must be before end time");
        }

        if (request.getStartTime().isBefore(now)) {
            System.err.println("❌ ERROR: Start time is in the past");
            System.err.println("   Start time: " + request.getStartTime());
            System.err.println("   Current time: " + now);
            throw new RuntimeException("Cannot create time slot in the past");
        }
        System.out.println("✅ Time range validated successfully");

        // Step 6: Create time slot entity
        System.out.println("\n6. Creating time slot entity...");
        TimeSlot timeSlot = new TimeSlot();
        timeSlot.setProvider(provider);
        timeSlot.setListing(listing);
        timeSlot.setStartTime(request.getStartTime());
        timeSlot.setEndTime(request.getEndTime());
        timeSlot.setIsAvailable(true);

        System.out.println("   Time slot details:");
        System.out.println("   - Provider: " + timeSlot.getProvider().getUsername() + " (ID: " + timeSlot.getProvider().getId() + ")");
        System.out.println("   - Listing: " + timeSlot.getListing().getServiceName() + " (ID: " + timeSlot.getListing().getId() + ")");
        System.out.println("   - Start: " + timeSlot.getStartTime());
        System.out.println("   - End: " + timeSlot.getEndTime());
        System.out.println("   - Available: " + timeSlot.getIsAvailable());

        // Step 7: Save to database
        System.out.println("\n7. Saving time slot to database...");
        try {
            TimeSlot savedTimeSlot = timeSlotRepository.save(timeSlot);
            System.out.println("✅ Time slot saved successfully!");
            System.out.println("   Generated ID: " + savedTimeSlot.getId());
            System.out.println("   Created at: " + savedTimeSlot.getCreatedAt());

            // Verify the save
            Optional<TimeSlot> verifyOpt = timeSlotRepository.findById(savedTimeSlot.getId());
            if (verifyOpt.isPresent()) {
                System.out.println("✅ Verification: Time slot found in database with ID: " + verifyOpt.get().getId());
            } else {
                System.err.println("⚠️ WARNING: Time slot not found after save!");
            }

            System.out.println("=== DEBUG COMPLETE ===\n");

            return mapToResponse(savedTimeSlot);

        } catch (Exception e) {
            System.err.println("❌ ERROR saving time slot to database!");
            System.err.println("   Error: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to save time slot: " + e.getMessage());
        }
    }

    @Override
    public TimeSlotResponse getTimeSlotById(Long timeSlotId) {
        System.out.println("Getting time slot by ID: " + timeSlotId);
        TimeSlot timeSlot = timeSlotRepository.findById(timeSlotId)
                .orElseThrow(() -> new RuntimeException("Time slot not found with ID: " + timeSlotId));
        return mapToResponse(timeSlot);
    }

    @Override
    public List<TimeSlotResponse> getProviderTimeSlots(Long providerId) {
        System.out.println("Getting all time slots for provider ID: " + providerId);
        List<TimeSlot> timeSlots = timeSlotRepository.findByProviderId(providerId);
        System.out.println("Found " + timeSlots.size() + " time slots for provider " + providerId);
        return timeSlots.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<TimeSlotResponse> getAvailableSlotsByListing(Long listingId) {
        System.out.println("Getting available time slots for listing ID: " + listingId);
        List<TimeSlot> timeSlots = timeSlotRepository.findAvailableSlotsByListing(
                listingId, LocalDateTime.now());
        System.out.println("Found " + timeSlots.size() + " available time slots for listing " + listingId);
        return timeSlots.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<TimeSlotResponse> getAvailableSlotsByProvider(Long providerId) {
        System.out.println("Getting available time slots for provider ID: " + providerId);
        List<TimeSlot> timeSlots = timeSlotRepository.findAvailableSlotsByProvider(
                providerId, LocalDateTime.now());
        System.out.println("Found " + timeSlots.size() + " available time slots for provider " + providerId);
        return timeSlots.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public TimeSlotResponse markSlotAsUnavailable(Long timeSlotId) {
        System.out.println("Marking time slot as unavailable, ID: " + timeSlotId);
        TimeSlot timeSlot = timeSlotRepository.findById(timeSlotId)
                .orElseThrow(() -> new RuntimeException("Time slot not found with ID: " + timeSlotId));

        System.out.println("Current availability: " + timeSlot.getIsAvailable());
        timeSlot.setIsAvailable(false);
        TimeSlot updatedTimeSlot = timeSlotRepository.save(timeSlot);
        System.out.println("Updated availability: " + updatedTimeSlot.getIsAvailable());

        return mapToResponse(updatedTimeSlot);
    }

    @Override
    public TimeSlotResponse markSlotAsAvailable(Long timeSlotId) {
        System.out.println("Marking time slot as available, ID: " + timeSlotId);
        TimeSlot timeSlot = timeSlotRepository.findById(timeSlotId)
                .orElseThrow(() -> new RuntimeException("Time slot not found with ID: " + timeSlotId));

        System.out.println("Current availability: " + timeSlot.getIsAvailable());
        timeSlot.setIsAvailable(true);
        TimeSlot updatedTimeSlot = timeSlotRepository.save(timeSlot);
        System.out.println("Updated availability: " + updatedTimeSlot.getIsAvailable());

        return mapToResponse(updatedTimeSlot);
    }

    @Override
    public void deleteTimeSlot(Long timeSlotId) {
        System.out.println("Deleting time slot, ID: " + timeSlotId);
        if (!timeSlotRepository.existsById(timeSlotId)) {
            throw new RuntimeException("Time slot not found with ID: " + timeSlotId);
        }
        timeSlotRepository.deleteById(timeSlotId);
        System.out.println("Time slot deleted successfully");
    }

    // Helper method to map TimeSlot entity to TimeSlotResponse DTO
    private TimeSlotResponse mapToResponse(TimeSlot timeSlot) {
        TimeSlotResponse response = new TimeSlotResponse();
        response.setId(timeSlot.getId());
        response.setProviderId(timeSlot.getProvider().getId());
        response.setProviderName(timeSlot.getProvider().getUsername());
        response.setListingId(timeSlot.getListing().getId());
        response.setServiceName(timeSlot.getListing().getServiceName());
        response.setStartTime(timeSlot.getStartTime());
        response.setEndTime(timeSlot.getEndTime());
        response.setIsAvailable(timeSlot.getIsAvailable());
        response.setCreatedAt(timeSlot.getCreatedAt());

        System.out.println("Mapped TimeSlot to Response: ID=" + response.getId() +
                ", Provider=" + response.getProviderName() +
                ", Listing=" + response.getServiceName());

        return response;
    }
}