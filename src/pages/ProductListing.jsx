import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import ProductGrid from '../components/organisms/ProductGrid';
import FilterSidebar from '../components/organisms/FilterSidebar';
import Breadcrumb from '../components/molecules/Breadcrumb';
import { selectAllProducts } from '../redux/slices/productsSlice';
import { setCategory } from '../redux/slices/filterSlice';

const ProductListing = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const allProducts = useSelector(selectAllProducts);
  const { category, searchTerm, sortBy } = useSelector((state) => state.filters);

  // Sync category from URL query param (?category=earrings) into redux filter state
  useEffect(() => {
    const urlCategory = searchParams.get('category');
    if (urlCategory) {
      dispatch(setCategory(urlCategory));
    }
  }, [searchParams, dispatch]);

  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    if (category && category !== 'all') {
      result = result.filter((p) => p.category === category);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(term) || p.category.toLowerCase().includes(term)
      );
    }

    if (sortBy === 'price-asc') {
      result.sort((a, b) => (a.specialPrice || a.price) - (b.specialPrice || b.price));
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => (b.specialPrice || b.price) - (a.specialPrice || a.price));
    } else if (sortBy === 'newest') {
      result = result.filter((p) => p.tag === 'NEW').concat(result.filter((p) => p.tag !== 'NEW'));
    }

    return result;
  }, [allProducts, category, searchTerm, sortBy]);

  return (
    <div className="container listing-page">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Shop' }]} />

      <div className="listing-layout">
        <FilterSidebar />
        <div className="listing-main">
          <ProductGrid products={filteredProducts} title={`${filteredProducts.length} Products`} />
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
