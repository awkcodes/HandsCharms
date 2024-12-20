import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AdminScreen.module.css';
import UsersPanel from '../components/Admin/UsersPanel';
import ProductsPanel from '../components/Admin/ProductsPanel';
import OrdersPanel from '../components/Admin/OrdersPanel';

const AdminScreen = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/');
        return;
      }

      try {
        const response = await fetch('/api/auth/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        
        if (!data.isAdmin) {
          navigate('/');
          return;
        }
        
        setIsAdmin(true);
      } catch (error) {
        navigate('/');
      }
    };

    checkAdmin();
  }, [navigate]);

  if (!isAdmin) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.adminScreen}>
      <nav className={styles.adminNav}>
        <button 
          className={activeTab === 'products' ? styles.active : ''} 
          onClick={() => setActiveTab('products')}
        >
          Products
        </button>
        <button 
          className={activeTab === 'orders' ? styles.active : ''} 
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
        <button 
          className={activeTab === 'users' ? styles.active : ''} 
          onClick={() => setActiveTab('users')}
        >
          Users
        </button>
      </nav>

      <div className={styles.adminContent}>
        {activeTab === 'products' && <ProductsPanel token={localStorage.getItem('token')} />}
        {activeTab === 'orders' && <OrdersPanel token={localStorage.getItem('token')} />}
        {activeTab === 'users' && <UsersPanel token={localStorage.getItem('token')} />}
      </div>
    </div>
  );
};

export default AdminScreen;