// src/api/providers.js
import api from './axios'

// Get all providers with basic info
export const getAllProvidersApi = () => 
  api.get('/admin/providers').then(r => r.data)

// Get provider by ID with detailed info
export const getProviderByIdApi = (providerId) => 
  api.get(`/admin/providers/${providerId}`).then(r => r.data)

// Get provider statistics
export const getProviderStatsApi = (providerId) => 
  api.get(`/admin/providers/${providerId}/stats`).then(r => r.data)

// Get provider reviews
export const getProviderReviewsApi = (providerId) => 
  api.get(`/admin/providers/${providerId}/reviews`).then(r => r.data)

// Get provider listings
export const getProviderListingsApi = (providerId) => 
  api.get(`/listings/provider/${providerId}`).then(r => r.data)

// Get provider bookings
export const getProviderBookingsApi = (providerId) => 
  api.get(`/bookings/provider/${providerId}`).then(r => r.data)

// Search providers
export const searchProvidersApi = (keyword) => 
  api.get('/admin/providers/search', { params: { keyword } }).then(r => r.data)

// Update provider status (activate/deactivate)
export const updateProviderStatusApi = (providerId, status) => 
  api.put(`/admin/providers/${providerId}/status`, null, { params: { status } }).then(r => r.data)