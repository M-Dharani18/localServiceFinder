import api from '@/api/axios'

export const createTimeSlotApi = (payload) => api.post('/timeslots', payload).then(r => r.data)
export const getTimeSlotByIdApi = (timeSlotId) => api.get(`/timeslots/${timeSlotId}`).then(r => r.data)
export const getProviderTimeSlotsApi = (providerId) => api.get(`/timeslots/provider/${providerId}`).then(r => r.data)
export const getAvailableSlotsByListingApi = (listingId) => api.get(`/timeslots/listing/${listingId}/available`).then(r => r.data)
export const getAvailableSlotsByProviderApi = (providerId) => api.get(`/timeslots/provider/${providerId}/available`).then(r => r.data)
export const markSlotUnavailableApi = (timeSlotId) => api.put(`/timeslots/${timeSlotId}/unavailable`).then(r => r.data)
export const markSlotAvailableApi = (timeSlotId) => api.put(`/timeslots/${timeSlotId}/available`).then(r => r.data)
export const deleteTimeSlotApi = (timeSlotId) => api.delete(`/timeslots/${timeSlotId}`).then(r => r.data)
