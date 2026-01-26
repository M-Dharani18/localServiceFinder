//package com.quickserve.backend.service.impl;
//
//import com.quickserve.backend.dto.ListingRequest;
//import com.quickserve.backend.dto.ListingResponse;
//import com.quickserve.backend.dto.SearchFilterRequest;
//import com.quickserve.backend.model.Listing;
//import com.quickserve.backend.model.User;
//import com.quickserve.backend.repository.ListingRepository;
//import com.quickserve.backend.repository.UserRepository;
//import com.quickserve.backend.service.ListingService;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.Comparator;
//import java.util.List;
//import java.util.stream.Collectors;
//
//@Service
//public class ListingServiceImpl implements ListingService {
//
//    @Autowired
//    private ListingRepository listingRepository;
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Override
//    public Listing createListing(Long providerId, ListingRequest req) {
//        User provider = userRepository.findById(providerId)
//                .orElseThrow(() -> new RuntimeException("Provider not found"));
//
//        Listing listing = new Listing();
//        listing.setProvider(provider);
//        listing.setServiceName(req.getServiceName());
//        listing.setDescription(req.getDescription());
//        listing.setPrice(req.getPrice());
//        listing.setLocation(req.getLocation());
//        listing.setCategory(req.getCategory());
//        listing.setImageUrl(req.getImageUrl());
//        listing.setIsAvailable(req.getIsAvailable() != null ? req.getIsAvailable() : true);
//        listing.setLatitude(req.getLatitude());
//        listing.setLongitude(req.getLongitude());
//
//        // ✅ CRITICAL MISSING LINE: Set status to PENDING
//        listing.setStatus(ListingStatus.PENDING);
//        // Also set isAvailable to false until approved
//        listing.setIsAvailable(false);
//        return listingRepository.save(listing);
//    }
//
//    @Override
//    public Listing updateListing(Long listingId, ListingRequest req) {
//        Listing listing = listingRepository.findById(listingId)
//                .orElseThrow(() -> new RuntimeException("Listing not found"));
//
//        listing.setServiceName(req.getServiceName());
//        listing.setDescription(req.getDescription());
//        listing.setPrice(req.getPrice());
//        listing.setLocation(req.getLocation());
//        listing.setCategory(req.getCategory());
//        listing.setImageUrl(req.getImageUrl());
//        if (req.getIsAvailable() != null) {
//            listing.setIsAvailable(req.getIsAvailable());
//        }
//        if (req.getLatitude() != null) {
//            listing.setLatitude(req.getLatitude());
//        }
//        if (req.getLongitude() != null) {
//            listing.setLongitude(req.getLongitude());
//        }
//
//        return listingRepository.save(listing);
//    }
//
//    @Override
//    public void deleteListing(Long listingId) {
//        listingRepository.deleteById(listingId);
//    }
//
//    @Override
//    public Listing toggleAvailability(Long listingId, Boolean isAvailable) {
//        Listing listing = listingRepository.findById(listingId)
//                .orElseThrow(() -> new RuntimeException("Listing not found"));
//
//        listing.setIsAvailable(isAvailable);
//        return listingRepository.save(listing);
//    }
//
//    @Override
//    public List<Listing> getProviderListings(Long providerId) {
//        return listingRepository.findByProviderId(providerId);
//    }
//
//    @Override
//    public List<ListingResponse> getAllAvailableListings() {
//        List<Listing> listings = listingRepository.findByIsAvailableTrue();
//        return listings.stream()
//                .map(this::convertToResponse)
//                .collect(Collectors.toList());
//    }
//
//    @Override
//    public List<ListingResponse> searchListings(String keyword) {
//        List<Listing> listings = listingRepository.searchAvailableListings(keyword);
//        return listings.stream()
//                .map(this::convertToResponse)
//                .collect(Collectors.toList());
//    }
//
//    @Override
//    public List<ListingResponse> filterByCategory(String category) {
//        List<Listing> listings = listingRepository.findByCategoryIgnoreCaseAndIsAvailableTrue(category);
//        return listings.stream()
//                .map(this::convertToResponse)
//                .collect(Collectors.toList());
//    }
//
//    @Override
//    public List<ListingResponse> filterByLocation(String location) {
//        List<Listing> listings = listingRepository.findByLocationContainingIgnoreCaseAndIsAvailableTrue(location);
//        return listings.stream()
//                .map(this::convertToResponse)
//                .collect(Collectors.toList());
//    }
//
//    @Override
//    public List<ListingResponse> advancedSearch(SearchFilterRequest request) {
//        // Get filtered results
//        List<Listing> listings = listingRepository.advancedSearch(
//                request.getKeyword(),
//                request.getCategory(),
//                request.getLocation(),
//                request.getMinPrice(),
//                request.getMaxPrice()
//        );
//
//        // Convert to response DTOs
//        List<ListingResponse> responses = listings.stream()
//                .map(this::convertToResponse)
//                .collect(Collectors.toList());
//
//        // Calculate distance if coordinates provided
//        if (request.getLatitude() != null && request.getLongitude() != null) {
//            responses.forEach(response -> {
//                if (response.getLatitude() != null && response.getLongitude() != null) {
//                    double distance = calculateDistance(
//                            request.getLatitude(), request.getLongitude(),
//                            response.getLatitude(), response.getLongitude()
//                    );
//                    response.setDistance(distance);
//                }
//            });
//
//            // Filter by max distance if specified
//            if (request.getMaxDistance() != null) {
//                responses = responses.stream()
//                        .filter(r -> r.getDistance() != null && r.getDistance() <= request.getMaxDistance())
//                        .collect(Collectors.toList());
//            }
//        }
//
//        // Sort results
//        if (request.getSortBy() != null) {
//            switch (request.getSortBy().toLowerCase()) {
//                case "price_asc":
//                    responses.sort(Comparator.comparing(ListingResponse::getPrice,
//                            Comparator.nullsLast(Comparator.naturalOrder())));
//                    break;
//                case "price_desc":
//                    responses.sort(Comparator.comparing(ListingResponse::getPrice,
//                            Comparator.nullsFirst(Comparator.reverseOrder())));
//                    break;
//                case "distance":
//                    responses.sort(Comparator.comparing(ListingResponse::getDistance,
//                            Comparator.nullsLast(Comparator.naturalOrder())));
//                    break;
//                case "relevance":
//                default:
//                    // Keep default relevance order from database
//                    break;
//            }
//        }
//
//        return responses;
//    }
//
//    @Override
//    public List<String> getAllCategories() {
//        return listingRepository.findAllDistinctCategories();
//    }
//
//    @Override
//    public List<String> getAllLocations() {
//        return listingRepository.findAllDistinctLocations();
//    }
//
//    // Helper method to convert Listing to ListingResponse
//    private ListingResponse convertToResponse(Listing listing) {
//        ListingResponse response = new ListingResponse();
//        response.setId(listing.getId());
//        response.setServiceName(listing.getServiceName());
//        response.setDescription(listing.getDescription());
//        response.setPrice(listing.getPrice());
//        response.setLocation(listing.getLocation());
//        response.setCategory(listing.getCategory());
//        response.setImageUrl(listing.getImageUrl());
//        response.setProviderId(listing.getProvider().getId());
//        response.setProviderName(listing.getProvider().getUsername());
//        response.setIsAvailable(listing.getIsAvailable());
//        response.setLatitude(listing.getLatitude());
//        response.setLongitude(listing.getLongitude());
//        return response;
//    }
//
//    // Haversine formula to calculate distance between two coordinates (in kilometers)
//    private double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
//        final int EARTH_RADIUS = 6371; // Radius in kilometers
//
//        double dLat = Math.toRadians(lat2 - lat1);
//        double dLon = Math.toRadians(lon2 - lon1);
//
//        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//                Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) *
//                        Math.sin(dLon / 2) * Math.sin(dLon / 2);
//
//        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//
//        return EARTH_RADIUS * c;
//    }
//}






package com.quickserve.backend.service.impl;

import com.quickserve.backend.dto.ListingRequest;
import com.quickserve.backend.dto.ListingResponse;
import com.quickserve.backend.dto.SearchFilterRequest;
import com.quickserve.backend.model.Listing;
import com.quickserve.backend.model.ListingStatus;
import com.quickserve.backend.model.User;
import com.quickserve.backend.repository.ListingRepository;
import com.quickserve.backend.repository.UserRepository;
import com.quickserve.backend.service.ListingService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ListingServiceImpl implements ListingService {

    @Autowired
    private ListingRepository listingRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Listing createListing(Long providerId, ListingRequest req) {
        User provider = userRepository.findById(providerId)
                .orElseThrow(() -> new RuntimeException("Provider not found"));

        Listing listing = new Listing();
        listing.setProvider(provider);
        listing.setServiceName(req.getServiceName());
        listing.setDescription(req.getDescription());
        listing.setPrice(req.getPrice());
        listing.setLocation(req.getLocation());
        listing.setCategory(req.getCategory());
        listing.setImageUrl(req.getImageUrl());
        listing.setLatitude(req.getLatitude());
        listing.setLongitude(req.getLongitude());

        // ✅ CRITICAL: Set default status to PENDING and isAvailable to false
        // New listings should NOT be visible to customers until admin approves
        listing.setStatus(ListingStatus.PENDING);
        listing.setIsAvailable(false); // Not available until approved

        // Override only if explicitly set in request (admin might create directly)
        if (req.getIsAvailable() != null) {
            listing.setIsAvailable(req.getIsAvailable());
        }

        return listingRepository.save(listing);
    }

    @Override
    public Listing updateListing(Long listingId, ListingRequest req) {
        Listing listing = listingRepository.findById(listingId)
                .orElseThrow(() -> new RuntimeException("Listing not found"));

        listing.setServiceName(req.getServiceName());
        listing.setDescription(req.getDescription());
        listing.setPrice(req.getPrice());
        listing.setLocation(req.getLocation());
        listing.setCategory(req.getCategory());
        listing.setImageUrl(req.getImageUrl());
        if (req.getIsAvailable() != null) {
            listing.setIsAvailable(req.getIsAvailable());
        }
        if (req.getLatitude() != null) {
            listing.setLatitude(req.getLatitude());
        }
        if (req.getLongitude() != null) {
            listing.setLongitude(req.getLongitude());
        }

        return listingRepository.save(listing);
    }

    @Override
    public void deleteListing(Long listingId) {
        listingRepository.deleteById(listingId);
    }

    @Override
    public Listing toggleAvailability(Long listingId, Boolean isAvailable) {
        Listing listing = listingRepository.findById(listingId)
                .orElseThrow(() -> new RuntimeException("Listing not found"));

        // Only allow toggling availability for APPROVED listings
        if (listing.getStatus() != ListingStatus.APPROVED) {
            throw new RuntimeException("Cannot change availability for non-approved listing");
        }

        listing.setIsAvailable(isAvailable);
        return listingRepository.save(listing);
    }

    @Override
    public List<Listing> getProviderListings(Long providerId) {
        // Provider can see ALL their listings (including PENDING, REJECTED)
        return listingRepository.findByProviderId(providerId);
    }

    @Override
    public List<ListingResponse> getAllAvailableListings() {
        // ✅ FIXED: Only show APPROVED listings to customers
        List<Listing> listings = listingRepository.findByStatus(ListingStatus.APPROVED);
        return listings.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<ListingResponse> searchListings(String keyword) {
        // ✅ FIXED: Only search in APPROVED listings
        List<Listing> listings = listingRepository.findApprovedListingsByKeyword(keyword);
        return listings.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<ListingResponse> filterByCategory(String category) {
        // ✅ FIXED: Filter APPROVED listings by category
        List<Listing> listings = listingRepository.findByStatusAndCategoryIgnoreCase(
                ListingStatus.APPROVED, category);
        return listings.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<ListingResponse> filterByLocation(String location) {
        // ✅ FIXED: Filter APPROVED listings by location
        List<Listing> listings = listingRepository.findApprovedListingsByLocation(location);
        return listings.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<ListingResponse> advancedSearch(SearchFilterRequest request) {
        // ✅ FIXED: Use approved-only advanced search
        List<Listing> listings = listingRepository.advancedSearchApproved(
                request.getKeyword(),
                request.getCategory(),
                request.getLocation(),
                request.getMinPrice(),
                request.getMaxPrice()
        );

        // Convert to response DTOs
        List<ListingResponse> responses = listings.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());

        // Calculate distance if coordinates provided
        if (request.getLatitude() != null && request.getLongitude() != null) {
            responses.forEach(response -> {
                if (response.getLatitude() != null && response.getLongitude() != null) {
                    double distance = calculateDistance(
                            request.getLatitude(), request.getLongitude(),
                            response.getLatitude(), response.getLongitude()
                    );
                    response.setDistance(distance);
                }
            });

            // Filter by max distance if specified
            if (request.getMaxDistance() != null) {
                responses = responses.stream()
                        .filter(r -> r.getDistance() != null && r.getDistance() <= request.getMaxDistance())
                        .collect(Collectors.toList());
            }
        }

        // Sort results
        if (request.getSortBy() != null) {
            switch (request.getSortBy().toLowerCase()) {
                case "price_asc":
                    responses.sort(Comparator.comparing(ListingResponse::getPrice,
                            Comparator.nullsLast(Comparator.naturalOrder())));
                    break;
                case "price_desc":
                    responses.sort(Comparator.comparing(ListingResponse::getPrice,
                            Comparator.nullsFirst(Comparator.reverseOrder())));
                    break;
                case "distance":
                    responses.sort(Comparator.comparing(ListingResponse::getDistance,
                            Comparator.nullsLast(Comparator.naturalOrder())));
                    break;
                case "relevance":
                default:
                    // Keep default relevance order from database
                    break;
            }
        }

        return responses;
    }

    @Override
    public List<String> getAllCategories() {
        // ✅ FIXED: Only get categories from APPROVED listings
        List<String> categories = listingRepository.findAllDistinctCategories();
        return categories.stream()
                .filter(category -> listingRepository.findByStatusAndCategoryIgnoreCase(
                        ListingStatus.APPROVED, category).size() > 0)
                .collect(Collectors.toList());
    }

    @Override
    public List<String> getAllLocations() {
        // ✅ FIXED: Only get locations from APPROVED listings
        List<String> locations = listingRepository.findAllDistinctLocations();
        return locations.stream()
                .filter(location -> listingRepository.findApprovedListingsByLocation(location).size() > 0)
                .collect(Collectors.toList());
    }

    // ✅ NEW: Additional method for admin to get listings by status
    public List<ListingResponse> getListingsByStatus(ListingStatus status) {
        List<Listing> listings = listingRepository.findByStatus(status);
        return listings.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    // ✅ NEW: Method to get pending listings count (for admin dashboard)
    public Long getPendingListingsCount() {
        return listingRepository.countByStatus(ListingStatus.PENDING);
    }

    // Helper method to convert Listing to ListingResponse
    private ListingResponse convertToResponse(Listing listing) {
        ListingResponse response = new ListingResponse();
        response.setId(listing.getId());
        response.setServiceName(listing.getServiceName());
        response.setDescription(listing.getDescription());
        response.setPrice(listing.getPrice());
        response.setLocation(listing.getLocation());
        response.setCategory(listing.getCategory());
        response.setImageUrl(listing.getImageUrl());
        response.setProviderId(listing.getProvider().getId());
        response.setProviderName(listing.getProvider().getUsername());
        response.setIsAvailable(listing.getIsAvailable());
        response.setLatitude(listing.getLatitude());
        response.setLongitude(listing.getLongitude());

        // ✅ NEW: Include status in response (useful for admin/provider views)
        response.setStatus(listing.getStatus());
        response.setAdminNotes(listing.getAdminNotes());
        response.setCreatedAt(listing.getCreatedAt());
        response.setReviewedAt(listing.getReviewedAt());

        return response;
    }

    // Haversine formula to calculate distance between two coordinates (in kilometers)
    private double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        final int EARTH_RADIUS = 6371; // Radius in kilometers

        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);

        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) *
                        Math.sin(dLon / 2) * Math.sin(dLon / 2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return EARTH_RADIUS * c;
    }
}