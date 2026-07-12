import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MainLayout from './components/templates/MainLayout';
import AppRoutes from './routes/AppRoutes';

const App = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <AppRoutes />
      </MainLayout>
    </BrowserRouter>
  );
};

export default App;
