import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  return (
    <Link to={`/shop?category=${category.slug}`} className="category-card">
      <img src={category.image} alt={category.name} className="category-card-image" />
      <span className="category-card-name">{category.name}</span>
    </Link>
  );
};

export default CategoryCard;
