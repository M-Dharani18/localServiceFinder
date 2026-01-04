// src/api/reviews.js

import axios from './axios';

const reviewAPI = {
  // Create a review
  createReview: async (reviewData) => {
    const response = await axios.post('/reviews', reviewData);
    return response.data;
  },

  // Get review by ID
  getReviewById: async (reviewId) => {
    const response = await axios.get(`/reviews/${reviewId}`);
    return response.data;
  },

  // Get review for a specific booking
  getReviewByBookingId: async (bookingId) => {
    try {
      const response = await axios.get(`/reviews/booking/${bookingId}`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        return null; // No review exists
      }
      throw error;
    }
  },

  // Get all reviews by customer
  getCustomerReviews: async (customerId) => {
    const response = await axios.get(`/reviews/customer/${customerId}`);
    return response.data;
  },

  // Get all reviews for a provider
  getProviderReviews: async (providerId) => {
    const response = await axios.get(`/reviews/provider/${providerId}`);
    return response.data;
  },

  // Get all reviews for a listing
  getListingReviews: async (listingId) => {
    const response = await axios.get(`/reviews/listing/${listingId}`);
    return response.data;
  },

  // Get average rating for a listing
  getListingRating: async (listingId) => {
    const response = await axios.get(`/reviews/listing/${listingId}/rating`);
    return response.data;
  },

  // Update a review
  updateReview: async (reviewId, reviewData) => {
    const response = await axios.put(`/reviews/${reviewId}`, reviewData);
    return response.data;
  },

  // Delete a review
  deleteReview: async (reviewId) => {
    const response = await axios.delete(`/reviews/${reviewId}`);
    return response.data;
  }
};

export default reviewAPI;