package com.quickserve.backend.controller;

import com.quickserve.backend.dto.ListingRequest;
import com.quickserve.backend.dto.ListingResponse;
import com.quickserve.backend.dto.SearchFilterRequest;
import com.quickserve.backend.model.Listing;
import com.quickserve.backend.service.ListingService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/listings")
@CrossOrigin(origins = "*")
public class ListingController {

    @Autowired
    private ListingService listingService;

    // ==================== PROVIDER ENDPOINTS ====================

    // PROVIDER creates listing
    @PostMapping("/provider/{providerId}")
    public ResponseEntity<Listing> createListing(
            @PathVariable Long providerId,
            @RequestBody ListingRequest req) {
        Listing listing = listingService.createListing(providerId, req);
        return ResponseEntity.ok(listing);
    }

    // PROVIDER updates listing
    @PutMapping("/provider/{listingId}")
    public ResponseEntity<Listing> updateListing(
            @PathVariable Long listingId,
            @RequestBody ListingRequest req) {
        Listing listing = listingService.updateListing(listingId, req);
        return ResponseEntity.ok(listing);
    }

    // PROVIDER deletes listing
    @DeleteMapping("/provider/{listingId}")
    public ResponseEntity<String> deleteListing(@PathVariable Long listingId) {
        listingService.deleteListing(listingId);
        return ResponseEntity.ok("Listing deleted successfully");
    }

    // PROVIDER toggles availability (Yes/No)
    @PatchMapping("/provider/{listingId}/availability")
    public ResponseEntity<Listing> toggleAvailability(
            @PathVariable Long listingId,
            @RequestBody Map<String, Boolean> request) {
        Boolean isAvailable = request.get("isAvailable");
        Listing listing = listingService.toggleAvailability(listingId, isAvailable);
        return ResponseEntity.ok(listing);
    }

    // PROVIDER gets their own listings (including unavailable ones)
    @GetMapping("/provider/{providerId}")
    public ResponseEntity<List<Listing>> getProviderListings(@PathVariable Long providerId) {
        List<Listing> listings = listingService.getProviderListings(providerId);
        return ResponseEntity.ok(listings);
    }

    // ==================== CUSTOMER ENDPOINTS ====================

    // CUSTOMER gets all available listings
    @GetMapping("/customer/all")
    public ResponseEntity<List<ListingResponse>> getAllAvailableListings() {
        List<ListingResponse> listings = listingService.getAllAvailableListings();
        return ResponseEntity.ok(listings);
    }

    // CUSTOMER searches by keyword
    @GetMapping("/customer/search")
    public ResponseEntity<List<ListingResponse>> searchListings(@RequestParam String keyword) {
        List<ListingResponse> listings = listingService.searchListings(keyword);
        return ResponseEntity.ok(listings);
    }

    // CUSTOMER filters by category
    @GetMapping("/customer/category/{category}")
    public ResponseEntity<List<ListingResponse>> filterByCategory(@PathVariable String category) {
        List<ListingResponse> listings = listingService.filterByCategory(category);
        return ResponseEntity.ok(listings);
    }

    // CUSTOMER filters by location
    @GetMapping("/customer/location")
    public ResponseEntity<List<ListingResponse>> filterByLocation(@RequestParam String location) {
        List<ListingResponse> listings = listingService.filterByLocation(location);
        return ResponseEntity.ok(listings);
    }

    // CUSTOMER advanced search with multiple filters and sorting
    @PostMapping("/customer/advanced-search")
    public ResponseEntity<List<ListingResponse>> advancedSearch(
            @RequestBody SearchFilterRequest request) {
        List<ListingResponse> listings = listingService.advancedSearch(request);
        return ResponseEntity.ok(listings);
    }

    // ==================== DROPDOWN OPTIONS ====================

    // Get all categories for dropdown
    @GetMapping("/customer/categories")
    public ResponseEntity<List<String>> getAllCategories() {
        List<String> categories = listingService.getAllCategories();
        return ResponseEntity.ok(categories);
    }

    // Get all locations for dropdown
    @GetMapping("/customer/locations")
    public ResponseEntity<List<String>> getAllLocations() {
        List<String> locations = listingService.getAllLocations();
        return ResponseEntity.ok(locations);
    }
}