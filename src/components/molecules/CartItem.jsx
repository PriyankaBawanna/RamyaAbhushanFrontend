import React from 'react';
import { formatCurrency } from '../../utils/formatCurrency';
import QuantitySelector from './QuantitySelector';
import IconButton from '../atoms/IconButton';
import useCart from '../../hooks/useCart';

const CartItem = ({ item }) => {
  const { incrementQuantity, decrementQuantity, removeFromCart } = useCart();

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} className="cart-item-image" />
      <div className="cart-item-details">
        <p className="cart-item-name">{item.name}</p>
        <p className="cart-item-price">{formatCurrency(item.price)}</p>
        <QuantitySelector
          quantity={item.quantity}
          onIncrement={() => incrementQuantity(item.id)}
          onDecrement={() => decrementQuantity(item.id)}
        />
      </div>
      <div className="cart-item-actions">
        <p className="cart-item-subtotal">{formatCurrency(item.price * item.quantity)}</p>
        <IconButton ariaLabel="Remove item" onClick={() => removeFromCart(item.id)}>
          ✕
        </IconButton>
      </div>
    </div>
  );
};

export default CartItem;
