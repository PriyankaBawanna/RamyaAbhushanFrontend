import { createSlice } from '@reduxjs/toolkit';
import dummyUsers from '../../data/users';

// NOTE: Yeh poora slice abhi dummy/local simulation hai.
// Jab backend ready ho, in reducers ki jagah createAsyncThunk se
// POST /api/auth/login, POST /api/auth/signup, aur JWT token ko
// localStorage/cookie me store karna. 'users' array ko delete kar dena.

const loadCurrentUser = () => {
  try {
    const raw = localStorage.getItem('aabhira_current_user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const initialState = {
  users: dummyUsers, // simulated "database" — remove once API is wired
  currentUser: loadCurrentUser(), // { id, name, email, phone } | null
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signup: (state, action) => {
      const { name, email, password, phone } = action.payload;
      const existing = state.users.find((u) => u.email === email);
      if (existing) {
        state.error = 'An account with this email already exists.';
        return;
      }
      const newUser = { id: `u${Date.now()}`, name, email, password, phone };
      state.users.push(newUser);
      const { password: _pw, ...safeUser } = newUser;
      state.currentUser = safeUser;
      state.error = null;
      localStorage.setItem('aabhira_current_user', JSON.stringify(safeUser));
    },
    login: (state, action) => {
      const { email, password } = action.payload;
      const user = state.users.find((u) => u.email === email && u.password === password);
      if (!user) {
        state.error = 'Invalid email or password.';
        return;
      }
      const { password: _pw, ...safeUser } = user;
      state.currentUser = safeUser;
      state.error = null;
      localStorage.setItem('aabhira_current_user', JSON.stringify(safeUser));
    },
    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem('aabhira_current_user');
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
});

export const { signup, login, logout, clearAuthError } = authSlice.actions;

// Selectors
export const selectCurrentUser = (state) => state.auth.currentUser;
export const selectIsAuthenticated = (state) => Boolean(state.auth.currentUser);
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;
