import { useDispatch, useSelector } from 'react-redux';
import {
  login,
  signup,
  logout,
  clearAuthError,
  selectCurrentUser,
  selectIsAuthenticated,
  selectAuthError,
} from '../redux/slices/authSlice';

const useAuth = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const error = useSelector(selectAuthError);

  return {
    currentUser,
    isAuthenticated,
    error,
    login: (email, password) => dispatch(login({ email, password })),
    signup: (name, email, password, phone) => dispatch(signup({ name, email, password, phone })),
    logout: () => dispatch(logout()),
    clearAuthError: () => dispatch(clearAuthError()),
  };
};

export default useAuth;
