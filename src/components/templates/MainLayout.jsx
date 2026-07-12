import React from 'react';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';

const MainLayout = ({ children }) => {
  return (
    <div className="app-shell">
      <Header />
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
