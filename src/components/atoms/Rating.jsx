import React from 'react';

const Rating = ({ value = 0, reviewCount }) => {
  const fullStars = Math.round(value);

  return (
    <div className="rating">
      <span className="rating-stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={i < fullStars ? 'star star-filled' : 'star'}>
            ★
          </span>
        ))}
      </span>
      {typeof reviewCount === 'number' && (
        <span className="rating-count">({reviewCount})</span>
      )}
    </div>
  );
};

export default Rating;
