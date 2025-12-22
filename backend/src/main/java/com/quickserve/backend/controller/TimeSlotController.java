//package com.quickserve.backend.controller;
//
//import com.quickserve.backend.dto.TimeSlotRequest;
//import com.quickserve.backend.dto.TimeSlotResponse;
//import com.quickserve.backend.service.TimeSlotService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/timeslots")
//@CrossOrigin(origins = "*")
//public class TimeSlotController {
//
//    @Autowired
//    private TimeSlotService timeSlotService;
//
//    // Create a new time slot
//    @PostMapping
//    public ResponseEntity<TimeSlotResponse> createTimeSlot(@RequestBody TimeSlotRequest request) {
//        try {
//            TimeSlotResponse response = timeSlotService.createTimeSlot(request);
//            return ResponseEntity.status(HttpStatus.CREATED).body(response);
//        } catch (RuntimeException e) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
//        }
//    }
//
//    // Get time slot by ID
//    @GetMapping("/{timeSlotId}")
//    public ResponseEntity<TimeSlotResponse> getTimeSlotById(@PathVariable Long timeSlotId) {
//        try {
//            TimeSlotResponse response = timeSlotService.getTimeSlotById(timeSlotId);
//            return ResponseEntity.ok(response);
//        } catch (RuntimeException e) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
//        }
//    }
//
//    // Get all time slots for a provider
//    @GetMapping("/provider/{providerId}")
//    public ResponseEntity<List<TimeSlotResponse>> getProviderTimeSlots(@PathVariable Long providerId) {
//        List<TimeSlotResponse> timeSlots = timeSlotService.getProviderTimeSlots(providerId);
//        return ResponseEntity.ok(timeSlots);
//    }
//
//    // Get available time slots for a specific listing
//    @GetMapping("/listing/{listingId}/available")
//    public ResponseEntity<List<TimeSlotResponse>> getAvailableSlotsByListing(@PathVariable Long listingId) {
//        List<TimeSlotResponse> timeSlots = timeSlotService.getAvailableSlotsByListing(listingId);
//        return ResponseEntity.ok(timeSlots);
//    }
//
//    // Get available time slots for a provider
//    @GetMapping("/provider/{providerId}/available")
//    public ResponseEntity<List<TimeSlotResponse>> getAvailableSlotsByProvider(@PathVariable Long providerId) {
//        List<TimeSlotResponse> timeSlots = timeSlotService.getAvailableSlotsByProvider(providerId);
//        return ResponseEntity.ok(timeSlots);
//    }
//
//    // Mark time slot as unavailable
//    @PutMapping("/{timeSlotId}/unavailable")
//    public ResponseEntity<TimeSlotResponse> markSlotAsUnavailable(@PathVariable Long timeSlotId) {
//        try {
//            TimeSlotResponse response = timeSlotService.markSlotAsUnavailable(timeSlotId);
//            return ResponseEntity.ok(response);
//        } catch (RuntimeException e) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
//        }
//    }
//
//    // Mark time slot as available
//    @PutMapping("/{timeSlotId}/available")
//    public ResponseEntity<TimeSlotResponse> markSlotAsAvailable(@PathVariable Long timeSlotId) {
//        try {
//            TimeSlotResponse response = timeSlotService.markSlotAsAvailable(timeSlotId);
//            return ResponseEntity.ok(response);
//        } catch (RuntimeException e) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
//        }
//    }
//
//    // Delete time slot
//    @DeleteMapping("/{timeSlotId}")
//    public ResponseEntity<String> deleteTimeSlot(@PathVariable Long timeSlotId) {
//        try {
//            timeSlotService.deleteTimeSlot(timeSlotId);
//            return ResponseEntity.ok("Time slot deleted successfully");
//        } catch (RuntimeException e) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Time slot not found");
//        }
//    }
//}


package com.quickserve.backend.controller;

import com.quickserve.backend.dto.TimeSlotRequest;
import com.quickserve.backend.dto.TimeSlotResponse;
import com.quickserve.backend.service.TimeSlotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/timeslots")
@CrossOrigin(origins = "*")
public class TimeSlotController {

    @Autowired
    private TimeSlotService timeSlotService;

    @PostMapping
    public ResponseEntity<?> createTimeSlot(@RequestBody TimeSlotRequest request) {
        System.out.println("=== DEBUG: Received TimeSlotRequest ===");
        System.out.println("Provider ID: " + request.getProviderId());
        System.out.println("Listing ID: " + request.getListingId());
        System.out.println("Start Time: " + request.getStartTime());
        System.out.println("End Time: " + request.getEndTime());
        System.out.println("Request Object: " + request);
        System.out.println("=== END DEBUG ===");

        try {
            TimeSlotResponse response = timeSlotService.createTimeSlot(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (RuntimeException e) {
            System.err.println("=== ERROR in createTimeSlot ===");
            System.err.println("Error message: " + e.getMessage());
            e.printStackTrace();
            System.err.println("=== END ERROR ===");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse(e.getMessage()));
        }
    }

    // Get time slot by ID
    @GetMapping("/{timeSlotId}")
    public ResponseEntity<TimeSlotResponse> getTimeSlotById(@PathVariable Long timeSlotId) {
        try {
            TimeSlotResponse response = timeSlotService.getTimeSlotById(timeSlotId);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // Get all time slots for a provider
    @GetMapping("/provider/{providerId}")
    public ResponseEntity<List<TimeSlotResponse>> getProviderTimeSlots(@PathVariable Long providerId) {
        List<TimeSlotResponse> timeSlots = timeSlotService.getProviderTimeSlots(providerId);
        return ResponseEntity.ok(timeSlots);
    }

    // Get available time slots for a specific listing
    @GetMapping("/listing/{listingId}/available")
    public ResponseEntity<List<TimeSlotResponse>> getAvailableSlotsByListing(@PathVariable Long listingId) {
        List<TimeSlotResponse> timeSlots = timeSlotService.getAvailableSlotsByListing(listingId);
        return ResponseEntity.ok(timeSlots);
    }

    // Get available time slots for a provider
    @GetMapping("/provider/{providerId}/available")
    public ResponseEntity<List<TimeSlotResponse>> getAvailableSlotsByProvider(@PathVariable Long providerId) {
        List<TimeSlotResponse> timeSlots = timeSlotService.getAvailableSlotsByProvider(providerId);
        return ResponseEntity.ok(timeSlots);
    }

    // Mark time slot as unavailable
    @PutMapping("/{timeSlotId}/unavailable")
    public ResponseEntity<TimeSlotResponse> markSlotAsUnavailable(@PathVariable Long timeSlotId) {
        try {
            TimeSlotResponse response = timeSlotService.markSlotAsUnavailable(timeSlotId);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    // Mark time slot as available
    @PutMapping("/{timeSlotId}/available")
    public ResponseEntity<TimeSlotResponse> markSlotAsAvailable(@PathVariable Long timeSlotId) {
        try {
            TimeSlotResponse response = timeSlotService.markSlotAsAvailable(timeSlotId);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    // Delete time slot
    @DeleteMapping("/{timeSlotId}")
    public ResponseEntity<String> deleteTimeSlot(@PathVariable Long timeSlotId) {
        try {
            timeSlotService.deleteTimeSlot(timeSlotId);
            return ResponseEntity.ok("Time slot deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Time slot not found");
        }
    }


    public static class ErrorResponse {
        private String error;

        public ErrorResponse(String error) {
            this.error = error;
        }

        public String getError() {
            return error;
        }

        public void setError(String error) {
            this.error = error;
        }
    }
}