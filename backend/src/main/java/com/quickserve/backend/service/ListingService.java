package com.quickserve.backend.service;

import com.quickserve.backend.dto.ListingRequest;
import com.quickserve.backend.dto.ListingResponse;
import com.quickserve.backend.dto.SearchFilterRequest;
import com.quickserve.backend.model.Listing;

import java.util.List;

public interface ListingService {

    // Provider operations
    Listing createListing(Long providerId, ListingRequest req);
    Listing updateListing(Long listingId, ListingRequest req);
    void deleteListing(Long listingId);
    Listing toggleAvailability(Long listingId, Boolean isAvailable);
    List<Listing> getProviderListings(Long providerId);

    // Customer operations (only available listings)
    List<ListingResponse> getAllAvailableListings();
    List<ListingResponse> searchListings(String keyword);
    List<ListingResponse> filterByCategory(String category);
    List<ListingResponse> filterByLocation(String location);

    // Advanced search with filters and sorting
    List<ListingResponse> advancedSearch(SearchFilterRequest request);

    // Dropdown options for customers
    List<String> getAllCategories();
    List<String> getAllLocations();
}