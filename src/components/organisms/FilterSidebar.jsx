import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import categories from '../../data/categories';
import { setCategory, setSortBy, resetFilters } from '../../redux/slices/filterSlice';

const FilterSidebar = () => {
  const dispatch = useDispatch();
  const { category, sortBy } = useSelector((state) => state.filters);

  return (
    <aside className="filter-sidebar">
      <div className="filter-block">
        <h4>Category</h4>
        <ul>
          <li>
            <button
              className={category === 'all' ? 'filter-active' : ''}
              onClick={() => dispatch(setCategory('all'))}
            >
              All Jewellery
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                className={category === cat.slug ? 'filter-active' : ''}
                onClick={() => dispatch(setCategory(cat.slug))}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="filter-block">
        <h4>Sort By</h4>
        <select value={sortBy} onChange={(e) => dispatch(setSortBy(e.target.value))}>
          <option value="recommended">Recommended</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="newest">Newest First</option>
        </select>
      </div>

      <button className="btn btn-ghost btn-sm" onClick={() => dispatch(resetFilters())}>
        Reset Filters
      </button>
    </aside>
  );
};

export default FilterSidebar;
