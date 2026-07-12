import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Price from '../components/atoms/Price';
import Rating from '../components/atoms/Rating';
import Breadcrumb from '../components/molecules/Breadcrumb';
import QuantitySelector from '../components/molecules/QuantitySelector';
import ProductGrid from '../components/organisms/ProductGrid';
import useCart from '../hooks/useCart';
import useWishlist from '../hooks/useWishlist';
import { selectAllProducts } from '../redux/slices/productsSlice';

const ProductDetail = () => {
  const { slug } = useParams();
  const products = useSelector(selectAllProducts);
  const product = products.find((p) => p.slug === slug);

  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  if (!product) {
    return (
      <div className="container">
        <p>Product not found.</p>
        <Link to="/shop">Back to Shop</Link>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="container product-detail-page">
      <Breadcrumb
        items={[
          { label: 'Home', to: '/' },
          { label: 'Shop', to: '/shop' },
          { label: product.name },
        ]}
      />

      <div className="product-detail-layout">
        <div className="product-detail-gallery">
          <img
            src={product.images[activeImage]}
            alt={product.name}
            className="product-detail-main-image"
          />
          <div className="product-detail-thumbnails">
            {product.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${product.name} ${idx + 1}`}
                className={idx === activeImage ? 'thumb-active' : ''}
                onClick={() => setActiveImage(idx)}
              />
            ))}
          </div>
        </div>

        <div className="product-detail-info">
          <p className="product-detail-brand">{product.brand}</p>
          <h1>{product.name}</h1>
          <Rating value={product.rating} reviewCount={product.reviewCount} />
          <Price
            price={product.price}
            specialPrice={product.specialPrice}
            discountPercent={product.discountPercent}
          />
          <p className="product-detail-description">{product.description}</p>

          <div className="product-detail-actions">
            <QuantitySelector
              quantity={quantity}
              onIncrement={() => setQuantity((q) => q + 1)}
              onDecrement={() => setQuantity((q) => Math.max(1, q - 1))}
            />
            <button
              className="btn btn-primary btn-lg"
              disabled={!product.inStock}
              onClick={() => addToCart(product, quantity)}
            >
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
            <button className="btn btn-outline btn-lg" onClick={() => toggleWishlist(product)}>
              {isWishlisted(product.id) ? '♥ Wishlisted' : '♡ Add to Wishlist'}
            </button>
          </div>

          <ul className="product-detail-meta">
            <li>✔ Anti-tarnish coating</li>
            <li>✔ Cash on Delivery available</li>
            <li>✔ 7-day easy returns</li>
          </ul>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <ProductGrid products={relatedProducts} title="You May Also Like" />
      )}
    </div>
  );
};

export default ProductDetail;
