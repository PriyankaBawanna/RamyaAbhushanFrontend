import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: 'all',
  searchTerm: '',
  sortBy: 'recommended', // 'recommended' | 'price-asc' | 'price-desc' | 'newest'
  priceRange: [0, 10000],
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
    },
    resetFilters: () => initialState,
  },
});

export const { setCategory, setSearchTerm, setSortBy, setPriceRange, resetFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
