// src/pages/ProviderReviews.jsx

import React, { useState, useEffect } from 'react';
import { Star, TrendingUp, MessageSquare } from 'lucide-react';
import reviewAPI from '../api/reviews';
import { toast } from 'react-toastify';
import ReviewCard from '../components/ReviewCard';

const ProviderReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalReviews: 0,
    averageRating: 0,
    ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  });
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const data = await reviewAPI.getProviderReviews(user.id);
      setReviews(data);
      calculateStats(data);
    } catch (error) {
      toast.error('Failed to fetch reviews');
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (reviewsData) => {
    if (reviewsData.length === 0) {
      setStats({
        totalReviews: 0,
        averageRating: 0,
        ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
      });
      return;
    }

    const totalReviews = reviewsData.length;
    const averageRating = reviewsData.reduce((sum, r) => sum + r.rating, 0) / totalReviews;
    
    const ratingDistribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviewsData.forEach(review => {
      ratingDistribution[review.rating]++;
    });

    setStats({ totalReviews, averageRating, ratingDistribution });
  };

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={20}
            className={star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading reviews...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <MessageSquare size={28} className="text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-800">Customer Reviews</h1>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Average Rating */}
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <div className="text-4xl font-bold text-blue-600 mb-2">
            {stats.averageRating.toFixed(1)}
          </div>
          {renderStars(Math.round(stats.averageRating))}
          <p className="text-sm text-gray-600 mt-2">Average Rating</p>
        </div>

        {/* Total Reviews */}
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <div className="text-4xl font-bold text-green-600 mb-2">
            {stats.totalReviews}
          </div>
          <p className="text-sm text-gray-600">Total Reviews</p>
        </div>

        {/* Trend */}
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <TrendingUp size={40} className="mx-auto text-purple-600 mb-2" />
          <p className="text-sm text-gray-600">Customer Satisfaction</p>
          <p className="text-lg font-semibold text-purple-600">
            {stats.totalReviews > 0 ? `${((stats.averageRating / 5) * 100).toFixed(0)}%` : '0%'}
          </p>
        </div>
      </div>

      {/* Rating Distribution */}
      {stats.totalReviews > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Rating Distribution</h3>
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = stats.ratingDistribution[rating];
              const percentage = (count / stats.totalReviews) * 100;
              
              return (
                <div key={rating} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-16">
                    <span className="text-sm font-medium">{rating}</span>
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-yellow-400 h-full rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Reviews List */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Recent Reviews</h3>
        
        {reviews.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <Star size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">No reviews yet</p>
            <p className="text-gray-400 text-sm mt-2">
              Complete bookings and provide great service to receive reviews
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderReviews;