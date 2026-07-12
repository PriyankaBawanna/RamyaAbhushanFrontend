import React from 'react';

const QuantitySelector = ({ quantity, onIncrement, onDecrement }) => {
  return (
    <div className="quantity-selector">
      <button type="button" onClick={onDecrement} className="quantity-btn">
        −
      </button>
      <span className="quantity-value">{quantity}</span>
      <button type="button" onClick={onIncrement} className="quantity-btn">
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
