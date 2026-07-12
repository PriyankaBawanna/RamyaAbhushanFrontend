import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProductGrid from '../components/organisms/ProductGrid';
import { selectWishlistItems } from '../redux/slices/wishlistSlice';

const Wishlist = () => {
  const items = useSelector(selectWishlistItems);

  return (
    <div className="container">
      <h1>My Wishlist</h1>
      {items.length === 0 ? (
        <div className="empty-state">
          <p>You haven't added anything to your wishlist yet.</p>
          <Link to="/shop" className="btn btn-primary">
            Explore Jewellery
          </Link>
        </div>
      ) : (
        <ProductGrid products={items} />
      )}
    </div>
  );
};

export default Wishlist;
