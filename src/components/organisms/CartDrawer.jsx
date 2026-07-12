import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CartItem from '../molecules/CartItem';
import { selectCartItems, selectCartTotal } from '../../redux/slices/cartSlice';
import { formatCurrency } from '../../utils/formatCurrency';

const CartDrawer = ({ isOpen, onClose }) => {
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  if (!isOpen) return null;

  return (
    <div className="cart-drawer-overlay" onClick={onClose}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-drawer-header">
          <h3>Your Cart</h3>
          <button className="icon-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="cart-drawer-body">
          {items.length === 0 ? (
            <p className="cart-empty">Your cart is empty.</p>
          ) : (
            items.map((item) => <CartItem key={item.id} item={item} />)
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-total-row">
              <span>Subtotal</span>
              <span>{formatCurrency(total)}</span>
            </div>
            <Link to="/cart" className="btn btn-outline btn-full" onClick={onClose}>
              View Cart
            </Link>
            <Link to="/checkout" className="btn btn-primary btn-full" onClick={onClose}>
              Checkout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
