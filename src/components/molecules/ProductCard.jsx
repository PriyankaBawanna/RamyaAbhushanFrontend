import React from 'react';
import { Link } from 'react-router-dom';
import Price from '../atoms/Price';
import Rating from '../atoms/Rating';
import Badge from '../atoms/Badge';
import IconButton from '../atoms/IconButton';
import useCart from '../../hooks/useCart';
import useWishlist from '../../hooks/useWishlist';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  return (
    <div className="product-card">
      <div className="product-card-image-wrap">
        <Link to={`/product/${product.slug}`}>
          <img src={product.images[0]} alt={product.name} className="product-card-image" />
        </Link>

        {product.tag && <Badge variant="tag">{product.tag}</Badge>}

        <IconButton
          ariaLabel="Toggle wishlist"
          active={wishlisted}
          onClick={() => toggleWishlist(product)}
          className="product-card-wishlist"
        >
          {wishlisted ? '♥' : '♡'}
        </IconButton>

        {!product.inStock && <div className="product-card-oos">Out of Stock</div>}
      </div>

      <div className="product-card-body">
        <Link to={`/product/${product.slug}`} className="product-card-name">
          {product.name}
        </Link>
        <Rating value={product.rating} reviewCount={product.reviewCount} />
        <Price
          price={product.price}
          specialPrice={product.specialPrice}
          discountPercent={product.discountPercent}
        />
        <button
          type="button"
          className="btn btn-outline btn-sm btn-full"
          disabled={!product.inStock}
          onClick={() => addToCart(product)}
        >
          {product.inStock ? 'Add to Cart' : 'Notify Me'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
