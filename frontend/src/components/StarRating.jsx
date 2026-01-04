// src/components/StarRating.jsx

import React from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ rating, totalReviews, size = 16, showCount = true }) => {
  const renderStars = () => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={size}
            className={
              star <= Math.round(rating)
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex items-center gap-2">
      {renderStars()}
      {showCount && (
        <span className="text-sm text-gray-600">
          {rating > 0 ? rating.toFixed(1) : '0.0'} ({totalReviews || 0} {totalReviews === 1 ? 'review' : 'reviews'})
        </span>
      )}
    </div>
  );
};

export default StarRating;