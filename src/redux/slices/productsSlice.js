import { createSlice } from '@reduxjs/toolkit';
import productsData from '../../data/products';

// NOTE: Abhi hum dummy data ko directly initialState me daal rahe hain.
// Jab API ready ho jaye, isko createAsyncThunk se replace karna:
//
// export const fetchProducts = createAsyncThunk('products/fetch', async () => {
//   const res = await fetch('/api/products');
//   return res.json();
// });
// aur extraReducers me pending/fulfilled/rejected handle karna.

const initialState = {
  items: productsData,
  status: 'succeeded', // 'idle' | 'loading' | 'succeeded' | 'failed' — API aane par use hoga
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
});

// Selectors
export const selectAllProducts = (state) => state.products.items;
export const selectProductBySlug = (state, slug) =>
  state.products.items.find((p) => p.slug === slug);
export const selectProductsByCategory = (state, category) =>
  state.products.items.filter((p) => p.category === category);

export default productsSlice.reducer;
