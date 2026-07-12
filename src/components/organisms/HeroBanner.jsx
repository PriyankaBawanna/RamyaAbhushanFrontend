import React from 'react';
import { Link } from 'react-router-dom';

const HeroBanner = () => {
  return (
    <section className="hero-banner">
      <div className="hero-content">
        <p className="hero-eyebrow">New Season Collection</p>
        <h1>Jewellery That Tells Your Story</h1>
        <p className="hero-subtitle">
          Anti-tarnish, lightweight & affordable fashion jewellery for every occasion.
        </p>
        <Link to="/shop" className="btn btn-primary btn-lg">
          Shop Now
        </Link>
      </div>
    </section>
  );
};

export default HeroBanner;
