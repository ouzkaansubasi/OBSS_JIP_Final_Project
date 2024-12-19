import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';
import UserPanel from './components/UserPanel';
import FavoriteList from './components/FavoriteList';
import Blacklist from './components/Blacklist';
import UserManagement from './components/UserManagement'; 
import ProductManagement from './components/ProductManagement';
import SellerManagement from './components/SellerManagement';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="/admin/user-management" element={<UserManagement />} />
        <Route path="/admin/product-management" element={<ProductManagement />} />
        <Route path="/admin/seller-management" element={<SellerManagement />} />
        <Route path="/user-panel" element={<UserPanel />} />
        <Route path="/favorites/:userId" element={<FavoriteList />} />
        <Route path="/blacklist/:userId" element={<Blacklist />} />
        <Route path="*" element={<h2>404 - Sayfa Bulunamadı</h2>} />
      </Routes>
    </Router>
  );
}

export default App;

