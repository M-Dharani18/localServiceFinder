// src/components/ReviewCard.jsx

import React from 'react';
import { Star, User } from 'lucide-react';

const ReviewCard = ({ review }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <User size={20} className="text-blue-600" />
          </div>
          <div>
            <p className="font-semibold text-gray-800">{review.customerName}</p>
            <p className="text-xs text-gray-500">{formatDate(review.createdAt)}</p>
          </div>
        </div>
        {renderStars(review.rating)}
      </div>

      {/* Comment */}
      {review.comment && (
        <p className="text-gray-700 text-sm leading-relaxed">{review.comment}</p>
      )}

      {/* Service Info (if needed) */}
      {review.serviceName && (
        <p className="text-xs text-gray-500 mt-2">
          Service: <span className="font-medium">{review.serviceName}</span>
        </p>
      )}
    </div>
  );
};

export default ReviewCard;