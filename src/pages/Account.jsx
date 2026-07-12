import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Account = () => {
  const { currentUser, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="container auth-page">
      <div className="auth-card">
        <h1>My Account</h1>
        <div className="account-details">
          <p>
            <strong>Name:</strong> {currentUser.name}
          </p>
          <p>
            <strong>Email:</strong> {currentUser.email}
          </p>
          <p>
            <strong>Phone:</strong> {currentUser.phone || '—'}
          </p>
        </div>

        <h3 className="account-section-title">Order History</h3>
        <p className="auth-demo-hint">
          No orders yet — this section is ready to connect to{' '}
          <code>GET /api/orders?userId={currentUser.id}</code> once your backend is live.
        </p>

        <button className="btn btn-outline" onClick={logout}>
          Sign Out
        </button>
        <p className="auth-switch">
          <Link to="/shop">Continue Shopping</Link>
        </p>
      </div>
    </div>
  );
};

export default Account;
