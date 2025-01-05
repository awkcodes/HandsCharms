import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import AboutScreen from './screens/AboutScreen';
import ShopScreen from './screens/ShopScreen';
import ContactScreen from './screens/ContactScreen';
import ProfileScreen from './screens/ProfileScreen';
import AdminScreen from './screens/AdminScreen';
import ProtectedRoute from './components/ProtectedRoute';
import SellerScreen from './screens/SellerScreen';
import './assets/styles/global.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/about" element={<AboutScreen />} />
          <Route path="/product/:id" element={<ProductScreen />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/shop" element={<ShopScreen />} />
          <Route path="/contact" element={<ContactScreen />} />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <ProfileScreen />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminScreen />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/seller" 
            element={
              <ProtectedRoute>
                <SellerScreen />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
