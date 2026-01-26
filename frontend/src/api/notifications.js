
// 1. src/api/notifications.js

import api from './axios'

// Get all notifications for a user
export const getUserNotificationsApi = (userId) => 
  api.get(`/notifications/user/${userId}`).then(r => r.data)

// Get unread notifications
export const getUnreadNotificationsApi = (userId) => 
  api.get(`/notifications/user/${userId}/unread`).then(r => r.data)

// Get unread count
export const getUnreadCountApi = (userId) => 
  api.get(`/notifications/user/${userId}/unread-count`).then(r => r.data)

// Mark as read
export const markAsReadApi = (notificationId) => 
  api.put(`/notifications/${notificationId}/read`).then(r => r.data)

// Mark all as read
export const markAllAsReadApi = (userId) => 
  api.put(`/notifications/user/${userId}/read-all`).then(r => r.data)

// Delete notification
export const deleteNotificationApi = (notificationId) => 
  api.delete(`/notifications/${notificationId}`).then(r => r.data)

// Create custom notification (for testing)
export const createCustomNotificationApi = (data) => 
  api.post('/notifications/custom', data).then(r => r.data)