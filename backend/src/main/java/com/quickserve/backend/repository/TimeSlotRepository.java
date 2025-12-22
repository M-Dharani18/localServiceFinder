package com.quickserve.backend.repository;

import com.quickserve.backend.model.TimeSlot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TimeSlotRepository extends JpaRepository<TimeSlot, Long> {

    // Find all time slots by provider
    List<TimeSlot> findByProviderId(Long providerId);

    // Find all time slots by listing
    List<TimeSlot> findByListingId(Long listingId);

    // Find available time slots for a specific listing
    @Query("SELECT t FROM TimeSlot t WHERE t.listing.id = :listingId " +
            "AND t.isAvailable = true AND t.startTime >= :now " +
            "ORDER BY t.startTime ASC")
    List<TimeSlot> findAvailableSlotsByListing(
            @Param("listingId") Long listingId,
            @Param("now") LocalDateTime now
    );

    // Find available time slots for a provider
    @Query("SELECT t FROM TimeSlot t WHERE t.provider.id = :providerId " +
            "AND t.isAvailable = true AND t.startTime >= :now " +
            "ORDER BY t.startTime ASC")
    List<TimeSlot> findAvailableSlotsByProvider(
            @Param("providerId") Long providerId,
            @Param("now") LocalDateTime now
    );

    // Check if a time slot conflicts with existing slots
    @Query("SELECT COUNT(t) > 0 FROM TimeSlot t WHERE t.provider.id = :providerId " +
            "AND t.listing.id = :listingId " +
            "AND ((t.startTime <= :startTime AND t.endTime > :startTime) " +
            "OR (t.startTime < :endTime AND t.endTime >= :endTime) " +
            "OR (t.startTime >= :startTime AND t.endTime <= :endTime))")
    boolean existsConflictingSlot(
            @Param("providerId") Long providerId,
            @Param("listingId") Long listingId,
            @Param("startTime") LocalDateTime startTime,
            @Param("endTime") LocalDateTime endTime
    );
}