import api from '@/api/axios'

// Provider endpoints
export const createListingApi = (providerId, payload) => api.post(`/listings/provider/${providerId}`, payload).then(r => r.data)
export const updateListingApi = (listingId, payload) => api.put(`/listings/provider/${listingId}`, payload).then(r => r.data)
export const deleteListingApi = (listingId) => api.delete(`/listings/provider/${listingId}`).then(r => r.data)
export const toggleAvailabilityApi = (listingId, isAvailable) => api.patch(`/listings/provider/${listingId}/availability`, { isAvailable }).then(r => r.data)
export const getProviderListingsApi = (providerId) => api.get(`/listings/provider/${providerId}`).then(r => r.data)

// Customer endpoints
export const getAllAvailableListingsApi = () => api.get('/listings/customer/all').then(r => r.data)
export const searchListingsApi = (keyword) => api.get('/listings/customer/search', { params: { keyword } }).then(r => r.data)
export const filterByCategoryApi = (category) => api.get(`/listings/customer/category/${encodeURIComponent(category)}`).then(r => r.data)
export const filterByLocationApi = (location) => api.get('/listings/customer/location', { params: { location } }).then(r => r.data)
export const advancedSearchApi = (payload) => api.post('/listings/customer/advanced-search', payload).then(r => r.data)

// Dropdown options
export const getCategoriesApi = () => api.get('/listings/customer/categories').then(r => r.data)
export const getLocationsApi = () => api.get('/listings/customer/locations').then(r => r.data)

// Add this to your existing listing.js API file
export const getListingByIdApi = (listingId) => 
  api.get(`/listings/${listingId}`).then(r => r.data)