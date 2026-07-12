import React from 'react';
import { useSelector } from 'react-redux';
import HeroBanner from '../components/organisms/HeroBanner';
import ProductGrid from '../components/organisms/ProductGrid';
import Testimonials from '../components/organisms/Testimonials';
import CategoryCard from '../components/molecules/CategoryCard';
import categories from '../data/categories';
import { selectAllProducts } from '../redux/slices/productsSlice';

const Home = () => {
  const products = useSelector(selectAllProducts);
  const bestsellers = products.filter((p) => p.tag === 'BESTSELLER' || p.rating >= 4.4);
  const newArrivals = products.filter((p) => p.tag === 'NEW');

  return (
    <div>
      <HeroBanner />

      <section className="category-section container">
        <h2 className="section-title">Shop by Category</h2>
        <div className="category-grid">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      <div className="container">
        <ProductGrid products={newArrivals} title="New Arrivals" />
        <ProductGrid products={bestsellers} title="Bestsellers" />
      </div>

      <Testimonials />
    </div>
  );
};

export default Home;
