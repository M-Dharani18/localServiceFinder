package com.quickserve.backend.service.impl;

import com.quickserve.backend.dto.NotificationDTO;
import com.quickserve.backend.model.*;
import com.quickserve.backend.repository.NotificationRepository;
import com.quickserve.backend.repository.UserRepository;
import com.quickserve.backend.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class NotificationServiceImpl implements NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<NotificationDTO> getUserNotifications(Long userId) {
        List<Notification> notifications = notificationRepository.findByUserIdOrderByCreatedAtDesc(userId);
        return notifications.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<NotificationDTO> getUnreadNotifications(Long userId) {
        List<Notification> notifications = notificationRepository.findByUserIdAndIsReadFalseOrderByCreatedAtDesc(userId);
        return notifications.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Long getUnreadCount(Long userId) {
        return notificationRepository.countByUserIdAndIsReadFalse(userId);
    }

    @Override
    public void markAsRead(Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new RuntimeException("Notification not found"));
        notification.setIsRead(true);
        notificationRepository.save(notification);
    }

    @Override
    public void markAllAsRead(Long userId) {
        notificationRepository.markAllAsReadByUserId(userId);
    }

    @Override
    public void deleteNotification(Long notificationId) {
        notificationRepository.deleteById(notificationId);
    }

    @Override
    public void createBookingNotification(Booking booking, String eventType) {
        try {
            switch (eventType) {
                case "CREATED":
                    // Notify customer
                    createNotificationForCustomer(booking);
                    // Notify provider
                    createNotificationForProvider(booking, "NEW_REQUEST");
                    break;

                case "CONFIRMED":
                    // Notify customer that provider confirmed
                    createCustomNotification(
                            booking.getCustomer().getId(),
                            "BOOKING_CONFIRMED",
                            "Booking Confirmed! 🎉",
                            String.format("Your booking for '%s' has been confirmed by %s for %s",
                                    booking.getListing().getServiceName(),
                                    booking.getListing().getProvider().getUsername(),
                                    formatDateTime(booking.getBookingDateTime())),
                            true
                    );
                    break;

                case "COMPLETED":
                    // Notify customer
                    createCustomNotification(
                            booking.getCustomer().getId(),
                            "BOOKING_COMPLETED",
                            "Service Completed ✓",
                            String.format("Your service '%s' has been marked as completed. Please leave a review!",
                                    booking.getListing().getServiceName()),
                            false
                    );
                    // Notify provider
                    createCustomNotification(
                            booking.getListing().getProvider().getId(),
                            "BOOKING_COMPLETED",
                            "Booking Completed ✓",
                            String.format("Booking with %s has been completed successfully.",
                                    booking.getCustomer().getUsername()),
                            false
                    );
                    break;

                case "CANCELLED":
                    // Notify both customer and provider
                    createCustomNotification(
                            booking.getCustomer().getId(),
                            "BOOKING_CANCELLED",
                            "Booking Cancelled",
                            String.format("Your booking for '%s' on %s has been cancelled.",
                                    booking.getListing().getServiceName(),
                                    formatDateTime(booking.getBookingDateTime())),
                            true
                    );
                    createCustomNotification(
                            booking.getListing().getProvider().getId(),
                            "BOOKING_CANCELLED",
                            "Booking Cancelled",
                            String.format("Booking with %s has been cancelled.",
                                    booking.getCustomer().getUsername()),
                            false
                    );
                    break;
            }
        } catch (Exception e) {
            System.err.println("Error creating booking notification: " + e.getMessage());
        }
    }

    private void createNotificationForCustomer(Booking booking) {
        Notification notification = new Notification();
        notification.setUser(booking.getCustomer());
        notification.setType("BOOKING_CREATED");
        notification.setTitle("Booking Created Successfully! 🎉");
        notification.setDescription(String.format(
                "Your booking for '%s' with %s has been created for %s. Waiting for provider confirmation.",
                booking.getListing().getServiceName(),
                booking.getListing().getProvider().getUsername(),
                formatDateTime(booking.getBookingDateTime())
        ));
        notification.setIsRead(false);
        notification.setIsImportant(true);
        notification.setBookingId(booking.getId());
        notification.setListingId(booking.getListing().getId());

        notificationRepository.save(notification);
    }

    private void createNotificationForProvider(Booking booking, String type) {
        Notification notification = new Notification();
        notification.setUser(booking.getListing().getProvider());
        notification.setType("NEW_BOOKING_REQUEST");
        notification.setTitle("New Booking Request! 📬");
        notification.setDescription(String.format(
                "You have a new booking request from %s for '%s' on %s. Please review and confirm.",
                booking.getCustomer().getUsername(),
                booking.getListing().getServiceName(),
                formatDateTime(booking.getBookingDateTime())
        ));
        notification.setIsRead(false);
        notification.setIsImportant(true);
        notification.setBookingId(booking.getId());
        notification.setListingId(booking.getListing().getId());

        notificationRepository.save(notification);
    }

    @Override
    public void createReviewNotification(Review review) {
        try {
            // Notify provider about new review
            createCustomNotification(
                    review.getProvider().getId(),
                    "REVIEW_RECEIVED",
                    "New Review Received! ⭐",
                    String.format(
                            "%s left you a %d-star review: \"%s\"",
                            review.getCustomer().getUsername(),
                            review.getRating(),
                            review.getComment() != null ? review.getComment() : "No comment"
                    ),
                    false
            );
        } catch (Exception e) {
            System.err.println("Error creating review notification: " + e.getMessage());
        }
    }

    @Override
    public void createCustomNotification(Long userId, String type, String title, String description, boolean isImportant) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Notification notification = new Notification();
        notification.setUser(user);
        notification.setType(type);
        notification.setTitle(title);
        notification.setDescription(description);
        notification.setIsRead(false);
        notification.setIsImportant(isImportant);

        notificationRepository.save(notification);
    }

    @Override
    public void cleanupOldNotifications(Long userId, int daysToKeep) {
        LocalDateTime cutoffDate = LocalDateTime.now().minusDays(daysToKeep);
        notificationRepository.deleteOldReadNotifications(userId, cutoffDate);
    }

    // Helper method to convert entity to DTO
    private NotificationDTO convertToDTO(Notification notification) {
        NotificationDTO dto = new NotificationDTO();
        dto.setId(notification.getId());
        dto.setUserId(notification.getUser().getId());
        dto.setType(notification.getType());
        dto.setTitle(notification.getTitle());
        dto.setDescription(notification.getDescription());
        dto.setIsRead(notification.getIsRead());
        dto.setIsImportant(notification.getIsImportant());
        dto.setBookingId(notification.getBookingId());
        dto.setListingId(notification.getListingId());
        dto.setReviewId(notification.getReviewId());
        dto.setCreatedAt(notification.getCreatedAt());
        dto.setTimeAgo(formatTimeAgo(notification.getCreatedAt()));
        return dto;
    }

    // Helper method to format time ago
    private String formatTimeAgo(LocalDateTime dateTime) {
        if (dateTime == null) return "Unknown";

        Duration duration = Duration.between(dateTime, LocalDateTime.now());
        long seconds = duration.getSeconds();

        if (seconds < 60) return "Just now";
        if (seconds < 3600) return (seconds / 60) + " minutes ago";
        if (seconds < 86400) return (seconds / 3600) + " hours ago";
        if (seconds < 604800) return (seconds / 86400) + " days ago";
        if (seconds < 2592000) return (seconds / 604800) + " weeks ago";
        return (seconds / 2592000) + " months ago";
    }

    // Helper method to format date time
    private String formatDateTime(LocalDateTime dateTime) {
        if (dateTime == null) return "Unknown";
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMM dd, yyyy 'at' hh:mm a");
        return dateTime.format(formatter);
    }
}