# Aabhira Jewels — React Ecommerce Starter

React + Redux Toolkit ecommerce base built using **Atomic Design** structure, with dummy jewellery product data. Replace dummy data with real API calls whenever ready.

## Tech Stack
- React 18 + Vite
- Redux Toolkit + React-Redux
- React Router v6
- Plain CSS (design tokens in `src/index.css`)

## Getting Started
```bash
npm install
npm run dev
```
Open http://localhost:5173

## Folder Structure (Atomic Design)
```
src/
  components/
    atoms/        → Button, Input, Badge, Rating, Price, IconButton
    molecules/     → ProductCard, SearchBar, QuantitySelector, CategoryCard, CartItem, Breadcrumb
    organisms/     → Header, Footer, HeroBanner, ProductGrid, FilterSidebar, CartDrawer, Testimonials
    templates/     → MainLayout
  pages/            → Home, ProductListing, ProductDetail, Cart, Wishlist, Checkout, NotFound
  redux/
    store.js
    slices/         → cartSlice, wishlistSlice, productsSlice, filterSlice
  data/             → products.js, categories.js  (DUMMY DATA — replace with API)
  hooks/            → useCart, useWishlist
  utils/            → formatCurrency
  routes/           → AppRoutes.jsx
```

## Features Implemented
- Home page: hero banner, category grid, new arrivals, bestsellers, testimonials
- Product listing with category filter, search, sort (via URL query + Redux)
- Product detail page with gallery, quantity selector, add to cart/wishlist, related products
- Cart (drawer + full page), quantity update, remove item
- Wishlist page
- **Sign In / Sign Up / My Account** — dummy auth (Redux `authSlice` + `localStorage` session),
  demo login: `priya@example.com` / `password123`
- **Checkout is a protected route** — redirects to `/login` if not signed in, then returns you to
  checkout after login
- **Payment Gateway (simulated)** — `PaymentGatewayModal` shows a card-entry popup like
  Razorpay/Stripe checkout, "processes" the payment, and returns a payment ID on success
- Fully responsive layout

## Auth (Sign In / Sign Up)
- `src/redux/slices/authSlice.js` — `signup`, `login`, `logout` reducers; simulated user "database"
  from `src/data/users.js`; current session persisted in `localStorage` under `aabhira_current_user`
- `src/hooks/useAuth.js` — hook wrapping the slice (`currentUser`, `isAuthenticated`, `login`, `signup`, `logout`)
- Pages: `src/pages/Login.jsx`, `src/pages/Signup.jsx`, `src/pages/Account.jsx`
- `src/components/molecules/ProtectedRoute.jsx` guards `/checkout` — swap this pattern onto any
  other route (e.g. `/account`) that should require login

### Replacing dummy auth with a real backend
1. Add `createAsyncThunk`s in `authSlice.js` for `POST /api/auth/login` and `POST /api/auth/signup`.
2. Store the returned JWT (instead of the user object) in `localStorage`/httpOnly cookie.
3. Remove `src/data/users.js` and the local password-matching logic.
4. Attach the token to authenticated requests (e.g. an axios interceptor or `fetch` header).

## Payment Gateway (Simulated)
- `src/components/organisms/PaymentGatewayModal.jsx` renders a card form and fakes a processing
  delay before calling `onSuccess(paymentId)`.
- It's wired into `src/pages/Checkout.jsx`: choosing "Pay Online" opens this modal; "Cash on
  Delivery" skips straight to placing the order.
- **The component's file header comment includes copy-pasteable steps for wiring real Razorpay or
  Stripe checkout** — the props contract (`amount`, `onSuccess`, `onClose`) stays the same, so
  swapping the simulation for the real SDK doesn't require touching `Checkout.jsx`.

## Replacing Dummy Data With Real API
1. **Products** — In `src/redux/slices/productsSlice.js`, replace the static `productsData` import
   with a `createAsyncThunk` that calls your API, and handle `pending/fulfilled/rejected` in
   `extraReducers`. Delete `src/data/products.js` once done.
2. **Categories** — Same approach for `src/data/categories.js`; move into its own slice if the list
   needs pagination/loading state.
3. **Checkout** — In `src/pages/Checkout.jsx`, replace the `alert(...)` on submit with a real
   `POST /api/orders` call, and handle loading/error states.
4. **Auth** — Not included yet. Add a `authSlice` + Login/Register pages when your backend is ready.

## Notes
- Images currently use `picsum.photos` placeholders — swap with real product image URLs from your API.
- All "add to cart"/"wishlist" logic goes through `useCart` / `useWishlist` hooks — no need to touch
  component internals when wiring the real API, just update the slices.
