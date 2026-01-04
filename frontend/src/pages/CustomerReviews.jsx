// src/pages/CustomerReviews.jsx

import React, { useState, useEffect } from 'react';
import { Star, MessageSquare } from 'lucide-react';
import reviewAPI from '../api/reviews';
import { toast } from 'react-toastify';
import ReviewCard from '../components/ReviewCard';

const CustomerReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchMyReviews();
  }, []);

  const fetchMyReviews = async () => {
    try {
      const data = await reviewAPI.getCustomerReviews(user.id);
      setReviews(data);
    } catch (error) {
      toast.error('Failed to fetch reviews');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading reviews...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <MessageSquare size={28} className="text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-800">My Reviews</h1>
      </div>

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <Star size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg">No reviews yet</p>
          <p className="text-gray-400 text-sm mt-2">
            Complete a booking and leave a review to share your experience
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}

      {/* Stats */}
      {reviews.length > 0 && (
        <div className="mt-6 bg-blue-50 rounded-lg p-4">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-blue-600">{reviews.length}</p>
              <p className="text-sm text-gray-600">Total Reviews</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">
                {(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)}
              </p>
              <p className="text-sm text-gray-600">Average Rating</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerReviews;