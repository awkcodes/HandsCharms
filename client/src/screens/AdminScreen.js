import React, { useState } from 'react';
import styles from './AdminScreen.module.css';
import UsersPanel from '../components/Admin/UsersPanel';
import ProductsPanel from '../components/Admin/ProductsPanel';
import OrdersPanel from '../components/Admin/OrdersPanel';

const AdminScreen = () => {
  const [activeTab, setActiveTab] = useState('products');

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
        {activeTab === 'products' && <ProductsPanel />}
        {activeTab === 'orders' && <OrdersPanel />}
        {activeTab === 'users' && <UsersPanel />}
      </div>
    </div>
  );
};

export default AdminScreen;