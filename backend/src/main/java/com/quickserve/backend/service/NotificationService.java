package com.quickserve.backend.service;

import com.quickserve.backend.dto.NotificationDTO;
import com.quickserve.backend.model.Booking;
import com.quickserve.backend.model.Review;

import java.util.List;

public interface NotificationService {

    // Get notifications for a user
    List<NotificationDTO> getUserNotifications(Long userId);
    List<NotificationDTO> getUnreadNotifications(Long userId);
    Long getUnreadCount(Long userId);

    // Mark notifications as read
    void markAsRead(Long notificationId);
    void markAllAsRead(Long userId);

    // Delete notification
    void deleteNotification(Long notificationId);

    // Create notifications based on events
    void createBookingNotification(Booking booking, String eventType);
    void createReviewNotification(Review review);
    void createCustomNotification(Long userId, String type, String title, String description, boolean isImportant);

    // Cleanup old notifications
    void cleanupOldNotifications(Long userId, int daysToKeep);
}
