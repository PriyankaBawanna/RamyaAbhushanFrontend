import React from 'react';
import { formatCurrency } from '../../utils/formatCurrency';

const Price = ({ price, specialPrice, discountPercent }) => {
  const hasDiscount = specialPrice && specialPrice < price;

  return (
    <div className="price-block">
      {hasDiscount ? (
        <>
          <span className="price-special">{formatCurrency(specialPrice)}</span>
          <span className="price-original">{formatCurrency(price)}</span>
          {discountPercent ? <span className="price-discount">-{discountPercent}%</span> : null}
        </>
      ) : (
        <span className="price-special">{formatCurrency(price)}</span>
      )}
    </div>
  );
};

export default Price;
