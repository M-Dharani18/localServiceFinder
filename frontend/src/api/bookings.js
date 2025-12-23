import api from '@/api/axios'

export const createBookingApi = (payload) => api.post('/bookings', payload).then(r => r.data)
export const getBookingByIdApi = (bookingId) => api.get(`/bookings/${bookingId}`).then(r => r.data)

export const getCustomerBookingsApi = (customerId) => api.get(`/bookings/customer/${customerId}`).then(r => r.data)
export const getCustomerUpcomingApi = (customerId) => api.get(`/bookings/customer/${customerId}/upcoming`).then(r => r.data)
export const getCustomerPastApi = (customerId) => api.get(`/bookings/customer/${customerId}/past`).then(r => r.data)

export const getProviderBookingsApi = (providerId) => api.get(`/bookings/provider/${providerId}`).then(r => r.data)
export const getProviderUpcomingApi = (providerId) => api.get(`/bookings/provider/${providerId}/upcoming`).then(r => r.data)
export const getProviderPastApi = (providerId) => api.get(`/bookings/provider/${providerId}/past`).then(r => r.data)

export const updateBookingStatusApi = (bookingId, status) => api.put(`/bookings/${bookingId}/status`, null, { params: { status } }).then(r => r.data)
export const confirmBookingApi = (bookingId) => api.put(`/bookings/${bookingId}/confirm`).then(r => r.data)
export const completeBookingApi = (bookingId) => api.put(`/bookings/${bookingId}/complete`).then(r => r.data)
export const cancelBookingApi = (bookingId) => api.put(`/bookings/${bookingId}/cancel`).then(r => r.data)
