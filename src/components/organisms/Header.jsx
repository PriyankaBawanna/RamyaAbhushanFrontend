import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SearchBar from '../molecules/SearchBar';
import IconButton from '../atoms/IconButton';
import { selectCartCount } from '../../redux/slices/cartSlice';
import useAuth from '../../hooks/useAuth';
import CartDrawer from './CartDrawer';

const Header = () => {
  const cartCount = useSelector(selectCartCount);
  const wishlistCount = useSelector((state) => state.wishlist.items.length);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { isAuthenticated, currentUser } = useAuth();

  return (
    <header className="header">
      <div className="header-top">
        For orders &amp; queries: 8882188858 | COD Available
      </div>
      <div className="header-main container">
        <Link to="/" className="logo">
          Aabhira <span>Jewels</span>
        </Link>

        <nav className="nav-links">
          <Link to="/shop?category=earrings">Earrings</Link>
          <Link to="/shop?category=necklaces">Necklaces</Link>
          <Link to="/shop?category=rings">Rings</Link>
          <Link to="/shop?category=bracelets">Bracelets</Link>
          <Link to="/shop?category=bridal-sets">Bridal</Link>
          <Link to="/shop">All Jewellery</Link>
        </nav>

        <div className="header-search">
          <SearchBar />
        </div>

        <div className="header-actions">
          <Link to={isAuthenticated ? '/account' : '/login'} className="header-account-link">
            {isAuthenticated ? `Hi, ${currentUser.name.split(' ')[0]}` : 'Sign In'}
          </Link>
          <Link to="/wishlist" className="header-icon-link">
            <IconButton ariaLabel="Wishlist">♡</IconButton>
            {wishlistCount > 0 && <span className="badge-count">{wishlistCount}</span>}
          </Link>
          <IconButton ariaLabel="Cart" onClick={() => setIsCartOpen(true)}>
            🛍
          </IconButton>
          {cartCount > 0 && <span className="badge-count">{cartCount}</span>}
        </div>
      </div>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
};

export default Header;
